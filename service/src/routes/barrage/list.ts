import * as Joi from '@hapi/joi';
import * as moment from 'moment';

import { IRoute, IContext } from '../../types';
import { IBarrage, Barrage } from '../../model/barrage';
import { IRoom, Room } from '../../model/room';
import { IUser, User } from '../../model/user';
import { Types } from 'mongoose';
import boom from '../../utils/boom';

const List: IRoute = {
  method: 'GET',
  path: '/list',
  validate: {
    auth: ['user', 'admin'],
    query: Joi.object({
      page: Joi.number().min(1).description('获取页码'),
      size: Joi.number().min(1).max(100).description('每页个数'),
      search: Joi.string().allow('').description('关键词搜索'),
      searchType: Joi.string().valid('content', 'nickname', 'userId').description('关键词搜索的类型'),
      startAt: Joi.number().description('开始时间'),
      endAt: Joi.number().description('结束时间')
    })
  },
  handle: async (ctx: IContext) => {
    const {
      page = 1,
      size = 10,
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
          $in: findUsers.map(user => user._id)
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
          $in: findUsers.map(user => user._id)
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
      q.room = roomId._id;
      const list: IBarrage[] = await Barrage
        .find(q)
        .populate([
          { path: 'user', select: 'nickname username' },
          { path: 'room', select: 'roomname' }
        ])
        .skip((page - 1) * size)
        .limit(size * 1)
        .sort({ createAt: -1 });
      const count: number = await Barrage.countDocuments(q);
      ctx.body = {
        list,
        count
      }
    } catch (err) {
      ctx.throw(err);
    }
  }
}

export default List;
