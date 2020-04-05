import user from './user';
import room from './room';
import barrage from './barrage';
import filterRule from './filterRule';

export default (app: any) => {
  app.use(user.routes());
  app.use(room.routes());
  app.use(barrage.routes());
  app.use(filterRule.routes());
};
