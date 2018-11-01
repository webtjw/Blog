import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1540994311817_618';

  // add your egg config in here
  config.middleware = [];

  // blog config
  const blogConfig = {
    indexArticleNum: 5,
  };

  // db config
  const mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'tanjiawei',
      password: '123456',
      database: 'techsite',
    },
    app: true,
    agent: false,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    blogConfig,
    mysql,
  };
};
