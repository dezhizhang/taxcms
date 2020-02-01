'use strict';

const Controller = require('egg').Controller;
class TaxController extends Controller {
    async index() {
        await this.ctx.render("/admin/tax/index")
    }

}

module.exports = TaxController;