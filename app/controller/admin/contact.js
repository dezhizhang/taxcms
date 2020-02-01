'use strict';

const BaseController = require('./base');
class ContactController extends BaseController {
    async index() {
        let result = await this.ctx.model.Contact.find();
        await this.ctx.render('/admin/contact/index',{
            list:result
        });
    }
    async add() {
        await this.ctx.render("/admin/contact/add")
    }
    async doAdd() {
        let result = this.ctx.request.body;
        let contact = new this.ctx.model.Contact(result)
        await contact.save()
        await this.success('/admin/contact','增加联系成功');
 
    }
    //修改
    async edit() {
        let id = this.ctx.query.id;
        let result = await this.ctx.model.Contact.find({'_id':id});
        await this.ctx.render('/admin/contact/edit',{
            list:result[0]
        })
    }
    //提交数据
    async doEdit() {
        let result = this.ctx.request.body;
        let id = result.id;
        let concatResult = await this.ctx.model.Contact.updateOne({'_id':id},result);
        await this.success('/admin/contact','修改联系人成功');

    }
    
}

module.exports = ContactController