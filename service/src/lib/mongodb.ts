import * as mongoose from 'mongoose';
import dbConfig from '../config/dbConfig';
import logger from '../utils/log4';

const { mongodb } = dbConfig;

/**
 * 连接 mongodb 数据库
 */

export default () => {
  mongoose.connect(mongodb.url, {
    authSource: mongodb.authSource,
    user: mongodb.user,
    pass: mongodb.password,
    useNewUrlParser: true
  });
  const connection = mongoose.connection;
  connection.on('connected', () => {
    logger.info('连接 mongodb 成功');
  });
  connection.on('error', err => {
    logger.error('与 mongodb 连接出现错误');
    logger.error(err);
  });
  connection.on('disconnected' , () => {
    logger.error('与 mongodb 连接断开');
  });
  connection.on('reconnected', () => {
    logger.info('重连mongodb成功');
  });
};
