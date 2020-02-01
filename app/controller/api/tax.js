'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const Controller = require('egg').Controller;
class TaxController extends Controller {
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
        let maintain =new this.ctx.model.Tax(Object.assign(files,parts.field));
        let result=await maintain.save();
        this.ctx.body = {
            code:200,
            msg:'上传成功',
            success:true,
            data:null
        }
    }

}

module.exports = TaxController;