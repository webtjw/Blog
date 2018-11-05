import { Controller } from "egg";

export default class BlogController extends Controller {
  async getIndexList(): Promise<void> {
    const { ctx } = this;
    ctx.body = await ctx.service.article.getLatestArticle();
  }

  async getArticleDetail(): Promise<void> {
    const { ctx } = this;
    // 参数基本都是字符串类型，必须使用 convertType 先进性类型转换。校验失败会抛出错误，由应用顶层捕捉返回
    ctx.validate({
      id: { required: true, convertType: 'number', type: 'int', min: 1 }
    }, ctx.params);
    // 参数检验通过后，调用 service 获取数据
    ctx.body = await ctx.service.article.getArticleDetail(ctx.params.id); // TypeScript 不会检查对 any 类型的值进行类型检查
  }

  async getArchive (): Promise<void> {
    const num = 10; // 一页 10 条数据
    const { ctx } = this;
    ctx.validate({
      index: { required: true, convertType: 'number', type: 'int', min: 1 }
    }, ctx.query);
    ctx.body = await ctx.service.article.getArchiveByIndex(ctx.query.index, num);
  }

  async getAllTags (): Promise<void> {
    const { ctx } = this;
    ctx.body = await ctx.service.article.getAllTags();
  }

  async getArticleByTag (): Promise<void> {
    const num: number = 10; // 一页 10 条数据
    const { ctx } = this;
    ctx.validate({
      index: { required: true, convertType: 'number', type: 'int', min: 1 },
      tag: { required: true, type: 'string', trim: true },
    }, ctx.query);
    ctx.body = await ctx.service.article.getArticleByTag(ctx.query.tag, ctx.query.index, num);
  }

  async save (): Promise<void> {
    const { ctx } = this
    console.log(ctx.request.body)
    ctx.body = ctx.request.body
  }
}