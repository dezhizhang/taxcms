'use strict';
const Controller = require('egg').Controller;
class AdvertController extends Controller {
    async index() {
        let result = await this.ctx.model.Advert.find();
        this.ctx.body = {
            code:200,
            msg:'SUCCESS',
            data:result
        }
    }

}

module.exports = AdvertController;