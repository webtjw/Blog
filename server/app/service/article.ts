import { Service } from 'egg';

export default class Article extends Service {
  async getLatestArticle() {
    const num: number = this.config.blogConfig.indexArticleNum;
    const rows: any[] = await this.app.mysql.query('select * from article order by time desc limit ?', [ num ]) as any[];
    return rows;
  }

  async getArticleDetail(id: number) {
    return id;
  }
}