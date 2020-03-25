import * as Joi from '@hapi/joi';

import { IRoute, IContext } from "../../types";
import { Room } from "../../model/room";
import boom from "../../utils/boom";

const update: IRoute = {
  path: '/:id',
  method: 'PATCH',
  validate: {
    auth: ['user', 'admin'],
    payload: Joi.object({
      roomname: Joi.string().min(4).max(20).description('直播间名称'),
      status: Joi.boolean().description('直播间状态')
    })
  },
  handle: async (ctx: IContext) => {
    // 获取当前用户的信息
    const { uid } = ctx.user;
    const roomId = ctx.params.id;
    const payload = ctx.request.body;
    try {
      const exist = await Room.findOne({ user: uid, _id: roomId });
      if (!exist) {
        return boom(400, ctx, '找不到房间号');
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'status')) {
        // 在 redis 中开启/关闭相应的直播间
        const redisRoomKey = `room:${roomId}`;
        // 置入当前uid的room
        const redisOwnKey = `userRoom:${uid}`;
        if (payload.status) {
          await ctx.redis.setAsync(redisRoomKey, true);
          await ctx.redis.setAsync(redisOwnKey, roomId);
        } else {
          // TODO: 在socket中删除，当前房间的用户
          await ctx.redis.delAsync(redisRoomKey);
          await ctx.redis.delAsync(redisOwnKey);
        }
      }

      // 修改数据
      await Room.updateOne({ _id: roomId }, payload);
      ctx.body = {
        message: '修改成功'
      }
    } catch(err) {
      ctx.throw(500, err);
    }
  }
};

export default update;
