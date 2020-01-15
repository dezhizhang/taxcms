'use strict';

const Service = require('egg').Service;

class SpiderService extends Service {
   async request(path) {
     let url = this.config.api + path
     let result = await this.ctx.curl(url);
     return result.data;

   }
}

module.exports = SpiderService;
