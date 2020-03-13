import * as log4 from 'log4js';
import { IContext } from '../types';

const logger = log4.getLogger();
/**
 * 中间件 当发生 http 请求时，将请求信息打印
 */

export default async (ctx: IContext, next: any) => {
  const startAt: number = new Date().getTime();
  await next();
  const endAt: number = new Date().getTime();
  logger.info(`${ctx.method} ${ctx.url} ${JSON.stringify(ctx.request.body)} ${ctx.status} ${endAt - startAt}ms`);
};
