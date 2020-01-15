'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class MaintainController extends BaseController {
    async index() {
        let result = await this.ctx.model.Maintain.find();
        await this.ctx.render('/admin/maintain/index',{
            list:result
        });
    }
    async edit() {
        let id = this.ctx.query.id;
        let result = await this.ctx.model.Maintain.find({'_id':id});
        await this.ctx.render('/admin/maintain/edit',{
            list:result[0]
        })
    }
    async doEdit() {
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
        let id=parts.field.id;
        let updateResult=Object.assign(files,parts.field);
        let maintain =await this.ctx.model.Maintain.updateOne({'_id':id},updateResult)
        await this.success('/admin/maintain','修改维修成功');
    }
  
}

module.exports = MaintainController