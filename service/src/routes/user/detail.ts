import { BaseContext } from "koa";
import { User } from "../../model/user";
import boom from "../../utils/boom";

/**
 * 获取用户的详情, 只有登录的用户才能访问此接口
 * user 用户只能获取自己的
 * admin 用户能获取所有的
 */

export default {
  validate: {
    auth: ['admin', 'user']
  },
  handle: async (ctx: BaseContext) => {
    const { id } = ctx.params;
    const { uid, role } = ctx.user;
    const q = { _id: id };
    if (role === 'user' && id !== uid) {
      boom(403, ctx, '不能获取该用户信息');
      return;
    }
    try {
      const user = await User.findOne(q);
      if (!user) {
        boom(400, ctx, '用户不存在');
      } else {
        ctx.body = user;
      }
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
