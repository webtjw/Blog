import { Context } from 'egg';
import utils from '../utils';

export default function normalizeReturn (): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    await next();
    const { response, response: { body } } = ctx;
    if ((response.headers['content-type'] as string).includes('application/json')) {
      response.body = utils.normalizeOutput(!!body, body);
    }
  }
}
