import { Controller } from 'egg';

export default class CommonController extends Controller {
  async handleUpload (): Promise<void> {
    this.ctx.body = await this.service.common.handleUpload();
  }
}