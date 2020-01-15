'use strict';

const Controller = require('egg').Controller;
class ClassifyController extends Controller {
    async index() {
        let result = await this.ctx.model.Classify.find();
        this.ctx.body = {
            code:200,
            msg:'请求成功',
            success:true,
            data:result
        }
       
    }

}

module.exports = ClassifyController;