'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
    async login() {
        let { code,appid } = this.ctx.query;
        console.log(code,appid);
        let data = await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=84e57fcbc1036f289c964444f58f16e7&js_code=${code}&grant_type=authorization_code`);
        let json =JSON.parse(data.data.toString()); 
        this.ctx.body = {
            code:200,
            msg:'success',
            data:json
        }
    }

}

module.exports = UserController;