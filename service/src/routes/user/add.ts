import * as joi from '@hapi/joi';

import { IRoute, IContext } from '../../types';
import { User } from '../../model/user';
import boom from '../../utils/boom';

const Add: IRoute = {
  path: '/',
  method: 'POST',
  validate: {
    payload: joi.object({
      username: joi.string().min(4).max(12).required().description('用户名'),
      nickname: joi.string().min(2).max(12).required().description('用户昵称'),
      password: joi.string().min(6).max(12).required().description('用户密码'),
    })
  },
  handle: async (ctx: IContext) => {
    const { username, nickname, password } = ctx.request.body;
    try {
      // 是否存在
      const exist = await User.findOne({ username });
      if (exist) {
        return boom(400, ctx, 'username重复');
      }
      // 入库
      await User.create({username, password, nickname});
      ctx.body = {
        message: '创建成功'
      }
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};

export default Add;
