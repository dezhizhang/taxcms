'use strict';

const BaseController = require('./base');
class UserController extends BaseController {
    async index() {
        let result = await this.ctx.model.User.find()
        await this.ctx.render("/admin/user/index",{
            list:result
        })
    }

   
    
}

module.exports = UserController