import * as Joi from '@hapi/joi';
import * as moment from 'moment';

import { IRoute, IContext } from '../../types';
import { IBarrage, Barrage } from '../../model/barrage';
import { IRoom, Room } from '../../model/room';
import { IUser, User } from '../../model/user';
import { Types } from 'mongoose';
import boom from '../../utils/boom';
import { calcGranularity } from './util';

const echart: IRoute = {
  method: 'GET',
  path: '/echart',
  validate: {
    auth: ['user', 'admin'],
    query: Joi.object({
      search: Joi.string().allow('').description('关键词搜索'),
      searchType: Joi.string().valid('content', 'nickname', 'userId').description('关键词搜索的类型'),
      startAt: Joi.number().description('开始时间'),
      endAt: Joi.number().description('结束时间')
    })
  },
  handle: async (ctx: IContext) => {
    const {
      search = '',
      searchType = 'content',
      startAt = moment().startOf('day').valueOf(),
      endAt = moment().valueOf()
    } = ctx.query;
    const { uid } = ctx.user;
    const reg = new RegExp(search, 'i');

    try {
      let q: any = {
        createAt: { $gte: new Date(Number(startAt)), $lt: new Date(Number(endAt)) },
      };
      if (searchType === 'content') {
        q.content = { $regex: reg };
      } else if (searchType === 'nickname') {
        const findUsers: IUser [] = await User.find({ nickname: { $regex: reg } });
        q.user = {
          $in: findUsers.map(user => Types.ObjectId(user._id))
        }
      } else if (searchType === 'userId') {
        let _id: Types.ObjectId | null = null;
        try {
          _id = Types.ObjectId(search);
        } catch (err) {
          boom(400, ctx, 'search 不是一个正确的user id');
          return;
        }
        const findUsers: IUser [] = await User.find({ _id });
        q.user = {
          $in: findUsers.map(user => Types.ObjectId(user._id))
        }
      }

      const roomId: null | IRoom = await Room.findOne({ user: uid });
      if (!roomId) {
        ctx.body = {
          list: [],
          count: 0
        };
        return;
      }
      q.room = Types.ObjectId(roomId._id);

      const contentStat = await Barrage.aggregate([
        {
          $match: q,
        },
        {
          $group: {
            _id: '$content',
            total: { $sum: 1 }
          }
        },
        {
          $sort: {
            "total": -1
          }
        },
        {
          $limit: 10
        }
      ]);
      const endIndex= calcGranularity(startAt, endAt);
      const countStat = await Barrage.aggregate([
        {
          $match: q
        },
        {
          $project: {
            time: {$substr: [{"$add": [ "$createAt", 28800000]}, 0, endIndex] }
          }
        },
        {
          $group: {
            _id: "$time",
            total: {$sum: 1},
          }
        },
        {
          $sort: {
            "_id": 1
          }
        }
      ]);
      ctx.body = {
        contentStat,
        countStat
      };
    } catch (err) {
      ctx.throw(err);
    }
  }
}

export default echart;
