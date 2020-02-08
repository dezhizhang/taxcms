'use strict';
const BaseController = require('./base');

class BackController extends BaseController {
    async index() {
        let result = await this.ctx.model.Back.find();
        await this.ctx.render("/admin/back/index",{
            list:result
        });
    }
    //增加
    async add() {
        await this.ctx.render("/admin/back/add")
    }
    async doAdd() {
        let result = this.ctx.request.body;
        let back = new this.ctx.model.Back(result)
        await back.save();
        await this.success("/admin/back","增加反馈成功");
    }
    
   
}

module.exports = BackController