import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { Context } from 'egg';
import utils from '../app/utils';
import DiffError, { DiffErrorTypes } from '../app/utils/diffError';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1540994311817_618';

  // 中间件列表（中间件也可以在这里拥有配置，查看文档）
  config.middleware = ['normalizeReturn'];

  // the return config will combines to EggAppConfig
  return {
    ...config,
    blogConfig: {
      indexArticleNum: 5,
      devCookieKey: 'JXU1OUFFJXU1M0VGJXU3RjU3JXU1QkJF'
    },
    mysql: {
      client: {
        host: 'localhost',
        port: '3306',
        user: 'tanjiawei',
        password: '123456',
        database: 'techsite',
      },
      app: true,
      agent: false,
    },
    onerror: {
      json (err: DiffError, ctx: Context) {
        ctx.status = 200;
        // egg 自报的错误没有 type 属性
        const isBusinessError: boolean = err.type !== undefined && err.type === DiffErrorTypes.business;
        ctx.body = utils.normalizeOutput(isBusinessError, !isBusinessError, err.message);
      }
    },
  };
};
