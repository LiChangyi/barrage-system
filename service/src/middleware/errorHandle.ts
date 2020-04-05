import boom from '../utils/boom';
import { IContext } from '../types';

/**
 * 自定义 错误的信息返回 信息 
 */

export default async (ctx: IContext, next: any) => {
  try {
    await next();
    // 重写 404 和 405 的消息
    if ([404, 405].includes(ctx.status)) {
      boom(ctx.status, ctx);
    }
  } catch (err) {
    boom(err.status, ctx, err.message);
    // 通知 全局监听器 打印错误信息
    ctx.app.emit('error', err);
  }
};
