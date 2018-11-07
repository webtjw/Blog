import { Context } from 'egg';
import utils from '../utils';

export default function normalizeReturn (): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    await next();
    // 业务错误（只能使用 throw Error 方式），代码错误只会跑到 config.error 中去
    // 未经历洋葱模型核心的请求，其状态码是 404，这部分请求需要过滤
    if (ctx.status !== 404) {
      ctx.body = utils.normalizeOutput(true, true, ctx.body);
    }
  }
}
