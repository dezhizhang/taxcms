'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const Core = require('@alicloud/pop-core');
const Controller = require('egg').Controller;
class UserController extends Controller {
    async code() {
        let code = Math.random().toString().slice(-6);
        await this.app.redis.set("phone_code",code);
        let { phone } = this.ctx.query;
        let client = new Core({
            accessKeyId: 'LTAI4FnT1q6ZHvd7SXB1MtgF',
            accessKeySecret: 'wNxsBibCVEeoaO9Ff2YHZ7X94nHYkH',
            endpoint: 'https://dysmsapi.aliyuncs.com',
            apiVersion: '2017-05-25'
        });
        let params = {
            "RegionId": "cn-hangzhou",
            "PhoneNumbers": phone,
            "SignName": "荣屿财税",
            "TemplateCode": "SMS_182870703",
            "TemplateParam": `{\"code\":\"${code}\"}`
        }
    
        let requestOption = {
            method: 'POST'
        };
        client.request('SendSms', params, requestOption).then((result) => {
            this.ctx.body = {
                code:200,
                msg:"发送验证码成功",
                data:null
            }
        }, (ex) => {
            this.ctx.body = {
                code:400,
                msg:"发道验证码失败",
                data:null
            }
        })
        this.ctx.body = {
            code:200,
            msg:"发送验证码成功",
            data:null
        }
        
    }
    //增加用户
    async add() {
        let result = this.ctx.request.body;
        result.password = await this.service.tools.md5(result.password);
        let phone_code = await this.app.redis.get("phone_code");
        let phone = result.phone;
        if(phone_code == result.phone_code) {
            let data = await this.ctx.model.User.find({"phone":phone});
            if(data.length > 0) {
                this.ctx.body = {
                    code:404,
                    msg:"手机号以被注册",
                    data:null
                }
            } else {
                let res = new this.ctx.model.User(result);
                await res.save();
                this.ctx.body = {
                    code:200,
                    msg:"注册成功",
                    data:null
                }

            }
        } else {
            this.ctx.body = {
                code:404,
                msg:"验证码有误",
                data:null
            }
        }
       
    }
    //用户登录
    async login() {
        let { phone,password } = this.ctx.request.body;
        let newpassword = await this.service.tools.md5(password)
        let data = await this.ctx.model.User.find({"phone":phone});
        if(data.length > 0) {
            let result = await this.ctx.model.User.find({"phone":phone,"password":newpassword});
            if(result.length > 0) {
                this.ctx.body = {
                    code:200,
                    msg:"登录成功",
                    data:result[0],
                    isReg:true
                }
            } else {
                this.ctx.body = {
                    code:400,
                    msg:"密码不正确",
                    data:null,
                    isReg:true
                }
            }
           
        } else {
            this.ctx.body = {
                code:200,
                msg:'你还没有注册',
                data:null,
                isReg:false
            }
        }
    }
    //获取用户信息
    async userInfo() {
        let { id } = this.ctx.query;
        if(id) {
            let result = await this.ctx.model.User.find({"_id":id});
            this.ctx.body = {
                code:200,
                msg:"SUCCESS",
                data:result[0]
            } 
        } else {
            this.ctx.body = {
                code:404,
                msg:"传入的参数有误",
                data:null
            }
        }
        
    }
    //修改用户信息
    async edit() {
        
        let parts = this.ctx.multipart({ autoFields: true });
        let files = {};               
        let stream;
        while ((stream = await parts()) != null) {
            if (!stream.filename) {          
              break;
            }       
            let fieldname = stream.fieldname;  //file表单的名字
            //上传图片的目录
            let dir=await this.service.tools.getUploadFile(stream.filename);
            let target = dir.uploadDir;
            let writeStream = fs.createWriteStream(target);
            await pump(stream, writeStream);  
            files=Object.assign(files,{
              [fieldname]:dir.saveDir    
            })
            
        }      
        //修改操作
        let id=parts.field.id;
        let updateResult=Object.assign(files,parts.field);
        let result =await this.ctx.model.User.updateOne({"_id":id},updateResult);
        this.ctx.body = {
            code:200,
            msg:"修改用户成功",
            data:null
            
        }
       
    }

}

module.exports = UserController;