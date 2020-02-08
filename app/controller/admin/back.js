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
    async edit() {
        let { id } = this.ctx.query;
        let result = await this.ctx.model.Back.find({"_id":id});
        await this.ctx.render("/admin/back/edit",{
            list:result[0]
        })
    }
    async doEdit() {
        let result = this.ctx.request.body;
        let id = result.id;
        let back = await this.ctx.model.Back.updateOne({'_id':id},result);
        await this.success("/admin/back","修改反馈成功");
    }
    
   
}

module.exports = BackController