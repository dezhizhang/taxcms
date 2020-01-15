'use strict';

const Controller = require('egg').Controller;
class DetailController extends Controller {
    async index() {
        let { detail_id } = this.ctx.query;
        if(detail_id){
            let result = await this.ctx.model.Detail.find({'detail_id':detail_id});
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

module.exports = DetailController;