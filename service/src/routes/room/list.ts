import { IRoute, IContext } from "../../types";
import { IRoom, Room } from "../../model/room";

const list: IRoute = {
  method: 'GET',
  path: '/list',
  validate: {
    auth: ['user', 'admin']
  },
  handle: async (ctx: IContext) => {
    try {
      // 获取当前开启的room
      const rooms: IRoom[] = await Room
        .find({ status: true })
        .populate([
          { path: 'user', select: 'nickname username' },
        ])
        .lean();
      const res: IRoom[] = [];
      await Promise.all(rooms.map(async (room: IRoom) => {
        const status = await ctx.redis.getAsync(`room:${room._id}`);
        if (status) {
          res.push(room);
        }
      }))
      ctx.body = res;
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}

export default list;
