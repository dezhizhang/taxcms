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

}

module.exports = MainController;