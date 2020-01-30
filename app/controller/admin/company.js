'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class ProductController extends BaseController {
    async index() {
        let page = this.ctx.query.page;
        let pageSize = 10;
        let totalNum = await this.ctx.model.Company.find().count();
        let totalPages = Math.ceil(totalNum/pageSize);
        let result = await this.ctx.model.Company.find().skip((page-1)*pageSize).limit(pageSize);
        await this.ctx.render('/admin/company/index',{
            list:result,
            totalPages:totalPages,
            page:page
        });
    }
    
    async add() {
        await this.ctx.render('/admin/company/add');
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
        let product =new this.ctx.model.Company(Object.assign(files,parts.field));
        let result=await product.save();
        await this.success('/admin/company','增加公司成功');
    }

    async edit() {
        let id = this.ctx.query.id;
        let result = await this.ctx.model.Company.find({'_id':id});
        await this.ctx.render('/admin/company/edit',{
            list:result[0]
        });
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
        let id=parts.field.id;
        let updateResult=Object.assign(files,parts.field);
        let company =await this.ctx.model.Company.updateOne({'_id':id},updateResult);
        await this.success('/admin/company','修改公司成功');
    }
   
}

module.exports = ProductController