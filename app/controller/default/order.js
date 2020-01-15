'use strict';
const Controller = require('egg').Controller;

class OrderController extends Controller {
    async index() {
        await this.ctx.render("/default/order",{
            result:[],
        })
      
    }
    
   
}

module.exports = OrderController