import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';

import { ITokenUser } from "../types";
import { Socket } from 'socket.io';
import { TOKEN_SUFFIX } from '../utils/constant';

// socket 用户验证 中间件

export default async (socket: Socket, next: any) => {
  // token 认证
  const token = _.get(socket.handshake, 'headers.token', '');
  try {
    const user: ITokenUser = await jwt.verify(token, TOKEN_SUFFIX) as ITokenUser;
    // 挂载 user 到socket上
    socket.user = user;
  } catch (err) {
    return next(new Error('tokenError:token 验证失败，请重新登录'));
  }
  return next();
}