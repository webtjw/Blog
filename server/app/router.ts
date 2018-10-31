import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  const blogPrefix = '/blog';
  router.get(`${blogPrefix}/index`, controller.blog.getIndexList);
};
