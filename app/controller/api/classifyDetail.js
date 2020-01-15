'use strict';

const Controller = require('egg').Controller;
class ClassifyDetailController extends Controller {
    async index() {
        let { classify_id } = this.ctx.query;
        if(classify_id) {
            let result = await this.ctx.model.ClassifyDetail.find({'classify_id':classify_id});
            this.ctx.body = {
                code:200,
                msg:'请求成功',
                success:true,
                data:result
            }
        } else {
            this.ctx.body = {
                code:404,
                msg:'传入的参数有误',
                success:false,
                data:null
            }
        }
      
       
    }

}

module.exports = ClassifyDetailController;