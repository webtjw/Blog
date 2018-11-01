import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  const blogPrefix: string = '/blog';
  // 首页数据
  router.get(`${blogPrefix}/index`, controller.blog.getIndexList);
  // 文章详情
  router.get(`${blogPrefix}/article/:id`, controller.blog.getArticleDetail)
};
