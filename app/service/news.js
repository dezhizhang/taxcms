'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
   async getNewsList() {
     let num = 1;
     
 

     let url = this.config.api + '/wodedianying_water_m3u8/youma/siwachangtui/62_20190824204716894/0001.ts';
     let list = await this.ctx.curl(url);
    //  let list = ['111','2222','3333','4444'];
     return list.data;

   }
}

module.exports = NewsService;
