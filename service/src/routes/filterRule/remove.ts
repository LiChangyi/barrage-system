import { IRoute, IContext } from "../../types";
import { IFilterRule, FilterRule } from "../../model/filterRule";
import boom from '../../utils/boom';

const remove: IRoute = {
  method: 'DELETE',
  path: '/:id',
  validate: {
    auth: ['user', 'admin']
  },
  handle: async (ctx: IContext) => {
    const { uid } = ctx.user;
    const ruleId = ctx.params.id;
    try {
      let exist: IFilterRule | null = await FilterRule.findOne({ _id: ruleId, user: uid });
      if (!exist) {
        return boom(400, ctx, 'id错误');
      }
      
      await FilterRule.deleteOne({ _id: ruleId });
      ctx.body = {
        message: 'success'
      }
    } catch (err) {
      ctx.throw(err);
    }
  }
};

export default remove;
