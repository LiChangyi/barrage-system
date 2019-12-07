/**
 * 一些公共的 方法组件
 */
import { createHash } from 'crypto';
import * as jwt from 'jsonwebtoken';
import { MD5_SUFFIX, TOKEN_SUFFIX, TOKEN_EXPIRES } from './constant';
import { IUser } from '../model/user';

// 用户密码 md5 加密
export const md5 = (str: string) => {
  const hash = createHash('md5');
  hash.update(str + MD5_SUFFIX);
  return hash.digest('hex');
};

// 生成 token 
export const createToken = async (user: IUser) => {
  return await jwt.sign({
    uid: user._id,
    role: user.role
  }, TOKEN_SUFFIX, {
    expiresIn: TOKEN_EXPIRES
  });
};
