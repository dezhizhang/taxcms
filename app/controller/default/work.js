'use strict';
const Controller = require('egg').Controller;

class WorkController extends Controller {
    async index() {
       await this.ctx.render("/default/work");
      
    }
    
   
}

module.exports = WorkController