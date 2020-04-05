import * as Joi from '@hapi/joi';

import { IRoute, IContext } from "../../types";
import { IFilterRule, FilterRule } from "../../model/filterRule";
import boom from '../../utils/boom';

const update: IRoute = {
  method: 'PATCH',
  path: '/:id',
  validate: {
    auth: ['user', 'admin'],
    payload: Joi.object({
      rule: Joi.string().description('规则字符串'),
      type: Joi.string().valid('noDisplay', 'filterKey').description('规则的类型'),
      status: Joi.boolean().description('规则当前状态')
    })
  },
  handle: async (ctx: IContext) => {
    const { uid } = ctx.user;
    const ruleId = ctx.params.id;
    const payload = ctx.request.body;
    try {
      let exist: IFilterRule | null = await FilterRule.findOne({ _id: ruleId, user: uid });
      if (!exist) {
        return boom(400, ctx, 'id错误');
      }
      if (payload.rule) {
        exist = await FilterRule.findOne({ _id: { $ne: ruleId }, rule: payload.rule, user: uid });
        if (exist) {
          return boom(400, ctx, '已存在相同rule');
        }
      }
      
      await FilterRule.updateOne({ _id: ruleId }, payload);
      ctx.body = {
        message: 'success'
      }
    } catch (err) {
      ctx.throw(err);
    }
  }
};

export default update;
