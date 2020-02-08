'use strict';
const Controller = require('egg').Controller;

class BackController extends Controller {
    async index() {
        let result = await this.ctx.model.Back.find();
        console.log(result);

        await this.ctx.render("/admin/back/index",{
            list:result
        });
    }
    //增加
    async add() {
        await this.ctx.render("/admin/back/add")
    }
    
   
}

module.exports = BackController