// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Blog from '../../../app/controller/blog';
import Home from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    blog: Blog;
    home: Home;
  }
}