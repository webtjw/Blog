import { Service } from 'egg';
import DiffError, { DiffErrorTypes } from '../utils/diffError';
const md5 = require('blueimp-md5'); // TODO this module needs to be declared

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

  async login (token: string): Promise<string> {
    const { app, ctx, config } = this;
    const rows: any[] = await app.mysql.query(`SELECT id,name FROM developer WHERE token='${token}'`) as any[];
    if (rows.length) {
      const [ { id, name } ] = rows;
      ctx.cookies.set('dev', this.encodeCookieDev(parseInt(id, 10), name), {
        httpOnly: true,
        maxAge: config.blogConfig.devCookieMaxAge,
        signed: true,
      });
      return name;
    } else {
      throw new DiffError('登入口令错误', DiffErrorTypes.business);
    }
  }

  async checkCookieDev (): Promise<boolean> {
    const { ctx } = this;
    let isDeveloper: boolean = false;
    const cookieDev = ctx.cookies.get('dev', { signed: true });
    if (cookieDev) {
      isDeveloper = await this.isLegalCookieDev(cookieDev)
    }
    return isDeveloper
  }

  async isLegalCookieDev (cookie: string): Promise<boolean> {
    const { app } = this;
    const id: string = cookie.slice(-1);
    if (/\d/.test(id)) {
      const result = await app.mysql.query(`SELECT name FROM developer WHERE id=${id}`) as any[];
      if (result && result.length) {
        const name = result[0].name;
        return this.encodeCookieDev(parseInt(id, 10), name) === cookie;
      }
    }
    return false;
  }

  encodeCookieDev (id: number, name: string): string {
    return md5(name, this.config.blogConfig.devCookieKey) + id;
  }
}