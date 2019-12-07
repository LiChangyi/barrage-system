import user from './user';

export default (app: any) => {
  app.use(user.routes());
};
