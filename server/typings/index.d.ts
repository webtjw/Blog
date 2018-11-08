import 'egg';

declare module 'egg' {
  interface Application {
    mysql: {
      async query(sql: string, value?: string[] | object): object; // TODO 更多的接口
    };
  }
}