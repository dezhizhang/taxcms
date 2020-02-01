'use strict';

const Controller = require('egg').Controller;
class ContactController extends Controller {
    async index() {
        let result = await this.ctx.model.Contact.find();
        this.ctx.body = {
            code:200,
            msg:"SUCCESS",
            data:result
        }
    }

}

module.exports = ContactController;