import { BaseContext } from "koa";
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import boom from '../utils/boom';
import * as Joi from '@hapi/joi';
import { TOKEN_SUFFIX } from "../utils/constant";

/**
 * 传递的参数校验 和 授权校验
 */

const authValidate = async (ctx: BaseContext, auth: string[]) => {
  const token = ctx.get('token');
  if (!token) {
    boom(401, ctx);
    return false;
  }
  try {
    const { role , uid }: any = await jwt.verify(token, TOKEN_SUFFIX);
    if (!auth.includes(role)) {
      boom(403, ctx);
      return false;
    }
    // 将 uid 和 role 保存在 ctx 中
    ctx.user = {
      uid, role
    };
  } catch (err) {
    boom(401, ctx, err.message);
    return false;
  }
  return true;
};

export default (validate: any): any => {  
  return async (ctx: BaseContext, next: any) => {
    const payload = _.get(validate, 'payload', null);
    const query = _.get(validate, 'query', null);
    const auth = _.get(validate, 'auth', []);

    // 校验权限
    if (auth.length) {
      const mark = await authValidate(ctx, auth);
      if ( !mark ) {
        return;
      }
    }

    let error = null;
    if (query) {
      const queryString = ctx.query;
      error = Joi.validate(queryString, query).error;
    }
    if (payload) {
      const body = ctx.request.body;
      error = Joi.validate(body, payload).error;
    }
    
    if (error) {
      const message = _.get(error, 'details[0].message', '参数校验失败');
      boom(400, ctx, message);
      return;
    }
    await next();
  };
};
