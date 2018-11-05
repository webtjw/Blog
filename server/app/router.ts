import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  const blogPrefix: string = '/blog';
  // 首页数据
  router.get(`${blogPrefix}/index`, controller.blog.getIndexList);
  // 文章详情
  router.get(`${blogPrefix}/article/:id`, controller.blog.getArticleDetail)
  // 归档列表
  router.get(`${blogPrefix}/archive`, controller.blog.getArchive)
  // 所有标签
  router.get(`${blogPrefix}/tags`, controller.blog.getAllTags)
  // 根据标签查询文章
  router.get(`${blogPrefix}/tag/:tag`, controller.blog.getArticleByTag)
  // 保存文章
  router.post(`${blogPrefix}/save`, controller.blog.save)
};
