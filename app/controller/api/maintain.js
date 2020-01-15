'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const Controller = require('egg').Controller;
class MaintainController extends Controller {
    async index() {
        let result = await this.ctx.model.Advert.find();
        this.ctx.body = {
            code:200,
            msg:'SUCCESS',
            data:result
        }
    }
    async upload() {
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

        let userInfo = parts.field;
        let email = '1018158888@qq.com';
        let subject = 'eureka科技预约';
        let text = `您小程序客户,姓名:${userInfo.username},电话：${userInfo.mobile},联系地址:${userInfo.address},问题描述:${userInfo.description}发来求助，请尽快处理！管理后台:https://www.eureka.net.cn/admin/login`;
        let html = '';
        let has_sned = await this.service.tools.sendEmail(email,subject,text,html);
        let maintain =new this.ctx.model.Maintain(Object.assign(files,parts.field));
        let result=await maintain.save();
        this.ctx.body = {
            code:200,
            msg:'上传成功',
            success:true,
            data:null
        }
    }

}

module.exports = MaintainController;