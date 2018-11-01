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
    }, ctx.params)
    // 参数检验通过后，调用 service 获取数据
    ctx.body = await ctx.service.article.getArticleDetail(ctx.params.id); // TypeScript 不会检查对 any 类型的值进行类型检查
  }
}