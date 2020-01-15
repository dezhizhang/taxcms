'use strict';
const Controller = require('egg').Controller;

class IndexController extends Controller {
    async index() {
        let focus = await this.ctx.model.Focus.find({'type':'1'});
        let product = await this.ctx.model.Product.find({"product_type":"2"});
        await this.ctx.render("/default/index",{
            focus,
            product
        })
    }
    
   
}

module.exports = IndexController