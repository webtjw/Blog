// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Blog from '../../../app/controller/blog';
import Common from '../../../app/controller/common';

declare module 'egg' {
  interface IController {
    blog: Blog;
    common: Common;
  }
}
