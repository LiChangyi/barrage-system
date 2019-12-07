/**
 * 删除一个用户
 */
import { BaseContext } from 'koa';
import { User } from '../../model/user';
import boom from '../../utils/boom';

export default {
  validate: {
    auth: ['admin']
  },
  handle: async (ctx: BaseContext) => {
    const { id } = ctx.params;
    try {
      const user = await User.findOneAndDelete({_id: id});
      if (!user) {
        boom(400, ctx, '用户不存在');
        return;
      }
      ctx.body = user;
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
