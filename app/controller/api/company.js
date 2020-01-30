'use strict';

const Controller = require('egg').Controller;
class MainController extends Controller {
    async index() {
        let page = this.ctx.query.page || 1;
        let pageSize = 10;
        let totalNum = await this.ctx.model.Company.find().count();
        let totalPages = Math.ceil(totalNum/pageSize);
        let result = await this.ctx.model.Company.find().skip((page-1)*pageSize).limit(pageSize);
        this.ctx.body = {
            code:200,
            msg:'SUCCESS',
            list:result,
            totalPages:totalPages,
            page:page
        }
    
    }
    //公司详情
    async detail() {
        let { id } = this.ctx.query;
        if(id) {
            let result = await this.ctx.model.Company.find({"_id":id});
            this.ctx.body = {
                code:200,
                msg:'SUCCESS',
                data:result[0]
            }
        } else {
            this.ctx.body = {
                code:404,
                msg:"传入参数有误",
                data:null
            }
        }
    }

}

module.exports = MainController;