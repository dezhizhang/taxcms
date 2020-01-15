'use strict';
const cheerio = require('cheerio');
module.exports = {
  schedule: {
    interval: '1s',
    type: 'all', 
  },
  async task(ctx) {
    //  let path = '/domestic/';
    //  let data = await ctx.service.spider.request(path);
    //  let htmlData = data.toString();
    //  const $ = cheerio.load(htmlData);
    // let title = $('h4').html();
    // console.log(title);

  },
};