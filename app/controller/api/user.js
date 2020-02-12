'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
    async login() {
        let { code,appid } = this.ctx.request.body;
        let data = await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=bba20ccc7c0b51307f539bab5a0e4779&js_code=${code}&grant_type=authorization_code`);
        let json =JSON.parse(data.data.toString()); 
        this.ctx.body = {
            code:200,
            msg:'success',
            data:json
        }
    }
}

module.exports = UserController;