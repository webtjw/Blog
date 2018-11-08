// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Article from '../../../app/service/article';
import Common from '../../../app/service/common';

declare module 'egg' {
  interface IService {
    article: Article;
    common: Common;
  }
}
