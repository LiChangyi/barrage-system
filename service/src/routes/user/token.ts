/**
 * 用户登录，返回 token
 * 如果登录失败超过 5次 进行 ip 锁定
 */
import * as Joi from '@hapi/joi';
import { User, IUser } from '../../model/user';
import { md5, createToken } from '../../utils';
import boom from '../../utils/boom';
import { PWD_ERROR } from '../../utils/constant';
import { convertTime } from './utils';
import { IContext, IRoute } from '../../types';

const route:IRoute = {
  method: 'POST',
  path: '/token',
  validate: {
    payload: Joi.object({
      username: Joi.string().min(4).max(12).required().description('用户名'),
      password: Joi.string().min(6).max(12).required().description('密码')
    })
  },
  handle: async (ctx: IContext) => {
    const { username, password } = ctx.request.body;
    try {
      const redisKey = `loginFail:${ctx.ip}`;
      // 获取登录失败的次数
      const str = await ctx.redis.getAsync(redisKey) || '';
      const [ time, count = 0 ] = str.split(':');
      if (count >= PWD_ERROR.count) {
        return boom(400, ctx, `登录失败次数已经超过${count}次，请${convertTime(time, PWD_ERROR.time)}过后再次尝试`);
      }
      const user: IUser | null = await User.findOne({
        username,
        password: md5(password)
      }, {
        password: 0
      });
      if (!user) {
        // 设置失败次数 和 当前的时间
        await ctx.redis.setAsync(redisKey, `${new Date().getTime()}:${Number(count) + 1}`, 'EX', PWD_ERROR.time);
        return boom(400, ctx, `用户名或者密码错误,你还有${PWD_ERROR.count - count - 1}次机会`);
      }
      // 生成 token
      const token = await createToken(user);
      ctx.body = {
        ...user.toObject(),
        token
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};

export default route;
