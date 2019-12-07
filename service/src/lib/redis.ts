/**
 * 连接 redis
 */
import * as redis from 'redis';
import { promisifyAll } from 'bluebird';
import dbConfig from '../config/dbConfig';
import logger from '../utils/log4';

export default () => {
  // 给 redis 添加 async 方法
  promisifyAll(redis.RedisClient.prototype);
  promisifyAll(redis.Multi.prototype);

  const client = redis.createClient({
    host: dbConfig.redis.host,
    password: dbConfig.redis.password
  });
  client.on('connect', () => {
    logger.info('与 redis 连接成功');
  });
  client.on('error', err => {
    logger.error('与 redis 连接失败');
    logger.error(err);
  });
  return client;
};
