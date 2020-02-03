'use strict';

const BaseController = require('./base');
class UserController extends BaseController {
    async index() {
        let result = await this.ctx.model.User.find()
        await this.ctx.render("/admin/user/index",{
            list:result
        })
    }
    async edit() {
        let { id } = this.ctx.query;
        console.log(id);
        
        let result = await this.ctx.model.User.find({"_id":id});
        await this.ctx.render("/admin/user/edit",{
            list:result[0]
        })
    }

   
    
}

module.exports = UserController