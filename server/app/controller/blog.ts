import { Controller } from "egg";

export default class BlogController extends Controller {
  async getIndexList() {
    const { ctx } = this;
    ctx.body = await ctx.service.article.getLatestArticle();
  }
}