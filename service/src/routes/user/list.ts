import { BaseContext } from "koa";
import { User } from '../../model/user';
import * as Joi from '@hapi/joi';

/**
 * 查看用户列表 只有管理员可以查看
 */

export default {
  validate: {
    auth: ['admin'],
    query: {
      page: Joi.number().min(1),
      size: Joi.number(),
      search: Joi.string()
    }
  },
  handle: async (ctx: BaseContext) => {
    const { page = 1, size = 10, search = '' } = ctx.query;
    try {
      const list = await User.find(
        {
          name: {
            $regex: search
          }
        }, {
          password: 0
        }
      ).skip((page - 1) * size).limit(size * 1);
      ctx.body = list;
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
