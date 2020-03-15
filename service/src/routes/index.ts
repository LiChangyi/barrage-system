import user from './user';
import room from './room';

export default (app: any) => {
  app.use(user.routes());
  app.use(room.routes());
};
