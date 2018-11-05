import { Service } from 'egg';

export default class Article extends Service {
  async getLatestArticle (): Promise<any[]> {
    const num: number = this.config.blogConfig.indexArticleNum;
    const rows: any[] = await this.app.mysql.query('SELECT id,title,tags,time,description FROM article ORDER BY time DESC LIMIT ?', [ num ]) as any[];
    return rows.map(item => {
      return {
        id: item.id,
        title: item.title,
        tags: item.tags.split(','),
        time: item.time,
        antecedent: item.description,
      }
    })
  }

  async getArticleDetail (id: number): Promise<object> {
    const rows: any[] = await this.app.mysql.query(`SELECT * FROM article WHERE id=${id}`) as any[];
    if (rows.length === 1) {
      const article = rows[0];
      article.tags = article.tags.split(',');
      return article;
    } else {
      throw new ReferenceError('文章不存在');
    }
  }

  async getArchiveByIndex (index: number, num: number): Promise<object> {
    const rows: any[] = await this.app.mysql.query(`SELECT id,title,tags,time FROM article ORDER BY time DESC LIMIT ${num * (index - 1)},${num * index}`) as any[];
    rows.forEach(item => {
      item.tags = item.tags.split(',');
    });
    return rows;
  }

  async getAllTags (): Promise<object> {
    const rows: any[] = await this.app.mysql.query(`SELECT * from tags`) as any[];
    return rows;
  }

  async getArticleByTag (tag: string, index: number, num: number): Promise<object> {
    const rows: any[] = await this.app.mysql.query(`SELECT id,title,tags,time FROM article WHERE tags LIKE '%${tag}%' ORDER BY time DESC LIMIT ${num * (index - 1)},${num * index}`) as any[];
    rows.forEach(item => {
      item.tags = item.tags.split(',');
    });
    return rows;
  }
}