import { BaseContext } from 'koa';
/**
 * 自定义返回数据给前端
 */


export default (code: number, ctx: BaseContext, message?: string) => {
  const { path, method } = ctx;
  ctx.status = code;
  ctx.body = {
    code: ctx.status,
    request: `${method} ${path}`,
    message: message || ctx.message
  };
};
