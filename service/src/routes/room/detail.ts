import { IRoute, IContext } from "../../types";
import { Room, IRoom } from "../../model/room";
import { User, IUser } from "../../model/user";

const detail: IRoute = {
  path: '/detail',
  method: 'GET',
  validate: {
    auth: ['user', 'admin']
  },
  handle: async (ctx: IContext) => {
    // 获取当前用户的信息
    const { uid } = ctx.user;
    try {
      const user:IUser | null = await User.findOne({ _id: uid });
      // 根据uid去寻找房间
      const exist: IRoom | null = await Room.findOne({ user });
      if (exist) {
        const redisRoomKey = `room:${exist._id}`;
        const redisOwnKey = `userRoom:${uid}`;
        if (exist.status) {
          await ctx.redis.setAsync(redisRoomKey, true);
          await ctx.redis.setAsync(redisOwnKey, String(exist._id));
        } else {
          await ctx.redis.delAsync(redisRoomKey);
          await ctx.redis.delAsync(redisOwnKey);
        }
        return ctx.body = exist;
      }
      // 没有则创建
      const room = new Room({
        roomname: `${user?.nickname}的直播间`,
        user: uid,
        status: false
      });
      await room.save();
      ctx.body = room;
    } catch(err) {
      ctx.throw(500, err);
    }
  }
};

export default detail;
