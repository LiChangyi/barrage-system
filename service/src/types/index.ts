import { Context } from 'koa';
import { Socket } from 'socket.io';

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

export interface ITokenUser {
  uid: string;
  role: string;
  nickname: string;
  iat: number;
  exp: number;
}

declare module "socket.io" {
  export interface Socket {
    user: ITokenUser;
    currentRoom: string;
  }
}
