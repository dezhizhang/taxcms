'use strict';
const Controller = require('egg').Controller;

class MarkController extends Controller {
    async index() {
        await this.ctx.render("/default/mark");
    }
        
   
}

module.exports = MarkController