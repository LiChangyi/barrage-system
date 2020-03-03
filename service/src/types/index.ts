import { Context } from 'koa';

// koa context
export interface IContext extends Context {
  user: {
    uid: String;
    role: String;
  };
};

// router interface
export interface IRoute {
  path: String;
  method?: String;
  validate?: {
    auth?: ('admin' | 'manager' | 'user')[];
    payload?: object;
    query?: object;
  };
  handle: any;
}
