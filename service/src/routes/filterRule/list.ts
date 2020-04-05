import { IRoute, IContext } from "../../types";
import { IFilterRule, FilterRule } from "../../model/filterRule";

const list: IRoute = {
  method: 'GET',
  path: '/list',
  validate: {
    auth: ['user', 'admin']
  },
  handle: async (ctx: IContext) => {
    const { uid } = ctx.user;
    try {
      const list: IFilterRule[] = await FilterRule.find({ user: uid }).sort({ createAt: -1 });
      ctx.body = list;
    } catch (err) {
      ctx.throw(err);
    }
  }
};

export default list;
