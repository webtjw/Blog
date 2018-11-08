import { Service } from 'egg';
const fs = require('fs');
import DiffError, { DiffErrorTypes } from '../utils/diffError';

export default class CommonService extends Service {
  async handleUpload (): Promise<string> {
    const { ctx } = this;
    const uploadStream = await ctx.getFileStream();
    const derectory = '/static/uploads';
    const filePath = `${derectory}/${Date.now() + uploadStream.filename}`;
    await new Promise(resolve => {
      // 生成文件
      const writeStream = fs.createWriteStream(filePath);
      uploadStream.pipe(writeStream);
      uploadStream.on('end', resolve);
    }).catch(e => {
      const tip = `上传图片出错：${e.message}`;
      console.error(tip);
      throw new DiffError(tip, DiffErrorTypes.business);
    });
    return filePath;
  }
}