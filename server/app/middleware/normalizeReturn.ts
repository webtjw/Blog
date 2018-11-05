import { Context } from 'egg';

export default function normalizeReturn (): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    await next();
    const { response } = ctx;
    if ((response.header['content-type'] as string).includes('application/json')) {
      response.body = response.body
        ? { success: true, data: response.body }
        : { success: false, data: 'error' }
    }
  }
}
