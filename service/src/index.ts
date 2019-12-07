import * as Koa from 'koa';
import logger from './utils/log4';
import Config from './config';
import middleware from './middleware';
import routes from './routes';
import mongodb from './lib/mongodb';
import redis from './lib/redis';

const app = new Koa();

app.env = process.env.NODE_ENV || app.env;

// 连接数据库
mongodb();
app.context.redis = redis();

// 加载中间件: 注意中间件的加载顺序会影响中间件的效果
middleware(app);

// 错误事件监听，并将结果打印
app.on('error', err => {
  if (!err) return;
  logger.error(err);
});

// 绑定路由
routes(app);

logger.info(`服务已经启动在：127.0.0.1:${Config.port}`);
app.listen(Config.port);
