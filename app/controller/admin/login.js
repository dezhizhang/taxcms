'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
    //显示用户登录
    async index() {
        await this.ctx.render('admin/login');
    }
    //热行用户登录
    async doLogin() {
        let data = this.ctx.request.body;
        let username = data.username;
        let password = await this.service.tools.md5(data.password);
        let code = data.code;
        if(code.toUpperCase() == this.ctx.session.code.toUpperCase()) {
            let result = await this.ctx.model.Admin.find({'username':username,'password':password});
            if(result.length > 0) {
                //保存用户信息
                this.ctx.session.userInfo = result[0];
                //跳转到用户中心
                this.ctx.redirect('/admin/manager'); 
            } else {
                await this.error('/admin/login','用户名或密码不正确')
            }

        } else {
            await this.error('/admin/login','验证码不正确');
        }
    }
    //退出登录
    async loginOut() {
        this.ctx.session.userInfo = null;
        this.ctx.redirect('/admin/login');
    }



}

module.exports = LoginController;
