'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class ClassifyDetailController extends BaseController {
   
    async index() {
        let { classify_id } = this.ctx.query;
        let result = await this.ctx.model.ClassifyDetail.find({'classify_id':classify_id});
        await this.ctx.render('/admin/classifyDetail/index',{
            list:result,
            classify_id
        })
    }
    async add() {
        let { classify_id } = this.ctx.query;
        await this.ctx.render('/admin/classifyDetail/add',{
            classify_id
        });
    }
    async doAdd() {
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
            await this.service.tools.jimpImg(target,200,200)
            
        }     
        let classify_id=parts.field.classify_id; 
        let classifyDetail =new this.ctx.model.ClassifyDetail(Object.assign(files,parts.field));
        classifyDetail.save();
        await this.success(`/admin/classifyDetail?classify_id=${classify_id}`,'增加分类详情成功');

    }
    async edit() {
        let { id } = this.ctx.query;
        let result = await this.ctx.model.ClassifyDetail.find({'_id':id});
        await this.ctx.render('/admin/classifyDetail/edit',{
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
            await this.service.tools.jimpImg(target,200,200)
            
        }     
        let { id,classify_id } = parts.field; 
        let updateClassify = await this.ctx.model.ClassifyDetail.updateOne({'_id':id},Object.assign(files,parts.field));
        await this.success(`/admin/classifyDetail?classify_id=${classify_id}`,'修改分类详情成功');

    }

}

module.exports = ClassifyDetailController;
