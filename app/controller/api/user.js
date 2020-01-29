'use strict';
const Core = require('@alicloud/pop-core');
const Controller = require('egg').Controller;

class UserController extends Controller {
    async code() {
        let { phone } = this.ctx.query;
        let client = new Core({
            accessKeyId: '<accessKeyId>',
            accessKeySecret: '<accessSecret>',
            endpoint: 'https://dysmsapi.aliyuncs.com',
            apiVersion: '2017-05-25'
        });
            
        let params = {
            "RegionId": "cn-hangzhou",
            "SignName": "荣屿财税",
            "TemplateCode": "SMS_182870703"
        }
            
        let requestOption = {
            method: 'POST'
        };
            
        client.request('SendSms', params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
        }, (ex) => {
            console.log(ex);
        });
        this.ctx.body = {
            code:200,
            msg:'发送验证成功',
            data:null
        }
    }
    //增加用户
    async add() {

    }

}

module.exports = UserController;