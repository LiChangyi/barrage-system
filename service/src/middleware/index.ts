import * as koaBody from 'koa-body';
import errorHandle from "./errorHandle";
import httpLog from "./httpLog";

/**
 * 集中注册中间件 这里需要 注意中间件的加载顺序会影响中间件的功能
 */

export default (app: any) => {
  app.use(koaBody({
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
  }));
  app.use(httpLog);
  app.use(errorHandle);
};