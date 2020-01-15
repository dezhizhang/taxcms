'use strict';

const Controller = require('egg').Controller;
class MainController extends Controller {
    async index() {
        let { main_id } = this.ctx.query;
        if(main_id){
            let result = await this.ctx.model.Main.find({'main_id':main_id});
            this.ctx.body = {
                code:200,
                msg:'请求成功',
                data:result
            }
        } else {
            this.ctx.body = {
                code:404,
                msg:'传入的参数有误',
                success:false
            }
        }
       
       
    }

}

module.exports = MainController;