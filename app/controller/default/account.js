'use strict';
const Controller = require('egg').Controller;
//记帐管理
class accountController extends Controller {
    async index() {
        await this.ctx.render("/default/account")
    }
}

module.exports = accountController