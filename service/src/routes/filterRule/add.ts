import * as Joi from '@hapi/joi';

import { IRoute, IContext } from "../../types";
import { IFilterRule, FilterRule } from "../../model/filterRule";
import boom from '../../utils/boom';

const add: IRoute = {
  method: 'POST',
  path: '/',
  validate: {
    auth: ['user', 'admin'],
    payload: Joi.object({
      rule: Joi.string().regex(new RegExp('^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){1,20}$')).description('规则字符串'),
      type: Joi.string().valid('noDisplay', 'filterKey').description('规则的类型'),
      status: Joi.boolean().description('规则当前状态')
    })
  },
  handle: async (ctx: IContext) => {
    const { uid } = ctx.user;
    const {
      rule,
      type = 'filterKey',
      status = false
    } = ctx.request.body;
    try {
      const exist: IFilterRule | null = await FilterRule.findOne({ rule, user: uid });
      if (exist) {
        return boom(400, ctx, 'rule已存在');
      }

      const data: IFilterRule = await FilterRule.create({ rule, type, status, user: uid });
      ctx.body = {
        message: 'success',
        data
      }
    } catch (err) {
      ctx.throw(err);
    }
  }
};

export default add;
