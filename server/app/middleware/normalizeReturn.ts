import { Context } from 'egg';
import utils from '../utils';

export default function normalizeReturn (): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    await next();
    // 业务错误（只能使用 throw Error 方式），代码错误只会跑到 config.error 中去
    ctx.body = utils.normalizeOutput(true, true, ctx.body);
  }
}
