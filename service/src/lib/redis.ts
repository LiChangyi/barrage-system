/**
 * 连接 redis
 */
import { RedisClient, Multi, createClient, RedisError } from 'redis';
import { promisifyAll } from 'bluebird';
import dbConfig from '../config/dbConfig';
import logger from '../utils/log4';

declare module "redis" {
  export interface RedisClient extends NodeJS.EventEmitter {
    setAsync(key:string, value:string): Promise<void>;
    getAsync(key:string): Promise<string>;
  }
}

let client: RedisClient | null = null;

export default () => {
  if (client) {
    return client;
  }
  // 给 redis 添加 async 方法
  promisifyAll(RedisClient.prototype);
  promisifyAll(Multi.prototype);

  client = createClient({
    host: dbConfig.redis.host,
    password: dbConfig.redis.password
  });
  client.on('connect', () => {
    logger.info('与 redis 连接成功');
  });
  client.on('error', (err: RedisError) => {
    logger.error('与 redis 连接失败');
    logger.error(err);
  });
  return client;
};
