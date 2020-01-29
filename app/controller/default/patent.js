'use strict';
const Controller = require('egg').Controller;

class PatentController extends Controller {
    async index() {
        await this.ctx.render("/default/patent");
    }
    
   
}

module.exports = PatentController