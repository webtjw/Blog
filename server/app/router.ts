import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  const blogPrefix: string = '/blog';
  router.get(`${blogPrefix}/index`, controller.blog.getIndexList); // 首页数据
  router.get(`${blogPrefix}/article/:id`, controller.blog.getArticleDetail) // 文章详情
  router.get(`${blogPrefix}/archive`, controller.blog.getArchive) // 归档列表
  router.get(`${blogPrefix}/tags`, controller.blog.getAllTags) // 所有标签
  router.get(`${blogPrefix}/tag/list`, controller.blog.getArticleByTag) // 根据标签查询文章
  router.post(`${blogPrefix}/save`, controller.blog.save) // 保存文章
  router.post(`${blogPrefix}/login`, controller.blog.login) // 登入
  router.get(`${blogPrefix}/isDeveloper`, controller.blog.checkCookieDev) // 开发者身份检查

  const commonPrefix: string = '/common' 
  router.post(`${commonPrefix}/upload`, controller.common.handleUpload) // 开发者身份检查
};
