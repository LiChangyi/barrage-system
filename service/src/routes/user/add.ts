import { BaseContext } from "koa";
import * as Joi from '@hapi/joi';
import boom from '../../utils/boom';
import { IUser, User } from '../../model/user';

/**
 * 添加用户
 */

export default {
  auth: ['admin'],
  validate: {
    payload: Joi.object({
      name: Joi.string().min(4).max(12).required().description('用户名'),
      password: Joi.string().min(4).max(12).required().description('密码')
    })
  },
  handle: async (ctx: BaseContext) => {
    try {
      const { name, password } = ctx.request.body;
      // 判断用户名是否重复
      const repeatName = await User.findOne({name});
      if (repeatName) {
        return boom(400, ctx, '用户名重复');
      }
      const user: IUser = new User({ name, password });
      const res = await user.save();
      ctx.body = res;
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
