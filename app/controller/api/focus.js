'use strict';

const Controller = require('egg').Controller;
class FocusController extends Controller {
    async index() {
        let result = await this.ctx.model.Focus.find();
        this.ctx.body = {
            code:200,
            msg:'SUCCESS',
            data:result
        }
    }

}

module.exports = FocusController;