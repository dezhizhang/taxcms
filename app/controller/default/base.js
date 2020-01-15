'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    //验证
    async verify() {
        let { width,height } = this.ctx.query;
        let params = {
            size:4,
            fontSize:50,
            width,
            height,
            background:'',
            color:'#fff'
        }
        let captcha = await this.service.tools.captcha(params);
        this.ctx.response.type = 'image/svg+xml';
        this.ctx.body = captcha.data;
    }
    
}

module.exports = BaseController;
