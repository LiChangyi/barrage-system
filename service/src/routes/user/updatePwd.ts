import { IRoute, IContext } from "../../types";
import * as joi from '@hapi/joi';
import { User, IUser } from "../../model/user";
import { md5 } from "../../utils";
import boom from "../../utils/boom";

export default {
  path: '/password',
  method: 'PATCH',
  validate: {
    auth: ['user', 'admin'],
    payload: joi.object({
      originalPassword: joi.string().required().description('原来的密码'),
      password: joi.string().min(6).max(12).required().description('新密码')
    })
  },
  async handle(ctx: IContext) {
    const { originalPassword, password } = ctx.request.body;
    const { uid } = ctx.user;
    try {
      const user: IUser | null = await User.findOne({
      _id: uid,
        password: md5(originalPassword)
      }, {
        password: 0
      });
      if (!user) {
        return boom(400, ctx, '原始密码不正确');
      }
      user.password = md5(password);
      await user.save();
      ctx.body = {
        message: 'success'
      }
    } catch (err) {
      ctx.throw(500, err);
    }
  }
} as IRoute;