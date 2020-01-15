'use strict';
const Controller = require('egg').Controller;

class LoginController extends Controller {
    //登录
    async index() {
        await this.ctx.render("/default/pass/login",{
            result:[],
        })
    }
    //注册第一步
    async registerStep1() {
        await this.ctx.render("/default/pass/register_step1",{
            
        })
    }
    //注册第二步
    async registerStep2() {
        let { phone,identify_code } = this.ctx.query;
        console.log(this.ctx.query);

        await this.ctx.render("/default/pass/register_step2",{
            phone,
            identify_code
        })
    }
    //验证输入的参数是否正确
    async sendCode() {
        let { phone,identify_code } = this.ctx.query;
        let code = this.ctx.session.code;
        if(identify_code.toUpperCase() == code.toUpperCase()) {
            this.ctx.body = {
                code:200,
                msg:'SUCCESS',
                data:{
                    phone
                }
            }
        } else {
            this.ctx.body = {
                code:403,
                msg:"验证码有误",
                data:null
            }
        }
    }
    
    
   
}

module.exports = LoginController