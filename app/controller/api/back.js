'use strict';

const Controller = require('egg').Controller;
class BackController extends Controller {
    async add() {
        let { email,description} = this.ctx.request.body;
        if(email) {
            let result = new this.ctx.model.Back({"email":email,"description":description});
            await result.save();
            this.ctx.body = {
                code:200,
                msg:"提交反馈成功",
                data:null
            }
        }else if(!email){
            this.ctx.body = {
                code:404,
                msg:"邮箱不能为空",
                data:null
            }
        } 


    }

}

module.exports = BackController;