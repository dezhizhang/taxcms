'use strict';

const BaseController = require('./base');
class UserController extends BaseController {
    async index() {
        await this.ctx.render("/admin/user/index")
    }

   
    
}

module.exports = UserController