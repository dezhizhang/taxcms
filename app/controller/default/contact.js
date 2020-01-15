'use strict';
const Controller = require('egg').Controller;
class ContactController extends Controller {
    async index() {
       await this.ctx.render('/default/contact/index')
    }
    //提交数据
    async doInfo() {
        let result = this.ctx.request.body;
        let username = result.username;
        let mobile = result.mobile;
        let code = result.code;
        if(username && mobile && code) {
            if(code.toUpperCase() == this.ctx.session.code.toUpperCase()) {
                let data = await this.ctx.model.Contact.find({'mobile':mobile});
                if(data.length > 0) {
                    this.ctx.body = {
                        code:404,
                        msg:'你以提交过信息了稍后我们会联系你',
                        data:null,
                        success:false
                    }
                } else {
                    let contactData = new this.ctx.model.Contact(result);
                    await contactData.save();

                    let email = '1018158888@qq.com';
                    let subject = 'eureka科技';
                    let text = `您网站客户,姓名:${username},电话：${mobile},提交了外包需求请尽快处理！管理后台:https://www.eureka.net.cn/admin/login`;
                    let html = '';
                    let has_sned = await this.service.tools.sendEmail(email,subject,text,html);
                    this.ctx.body = {
                        code:200,
                        msg:'提交信息成功',
                        success:true,
                        data:null
                    }
                }
            } else {
                this.ctx.body = {
                    code:404,
                    msg:'验证码错误',
                    success:false,
                    data:null
                }
            }
        } else if(!username){
            this.ctx.body = {
                code:404,
                msg:'用户名不能为空',
                success:false,
                data:null
            }
        } else if(!mobile) {
            this.ctx.body = {
                code:404,
                msg:'手机号不能为空',
                success:false,
                data:null
            }
        } else if(!code) {
            this.ctx.body = {
                code:404,
                msg:'验证码不能为空',
                success:false,
                data:null
            }
        }


    }
    
   
}

module.exports = ContactController