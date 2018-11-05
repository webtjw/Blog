// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import NormalizeReturn from '../../../app/middleware/normalizeReturn';

declare module 'egg' {
  interface IMiddleware {
    normalizeReturn: typeof NormalizeReturn;
  }
}
