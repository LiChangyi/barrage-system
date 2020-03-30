import user from './user';
import room from './room';
import barrage from './barrage';

export default (app: any) => {
  app.use(user.routes());
  app.use(room.routes());
  app.use(barrage.routes());
};
