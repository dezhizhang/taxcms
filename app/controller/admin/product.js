'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class ProductController extends BaseController {
    async index() {
        let page = this.ctx.query.page;
        let pageSize = 10;
        let totalNum = await this.ctx.model.Product.find().count();
        let totalPages = Math.ceil(totalNum/pageSize);
        let result = await this.ctx.model.Product.find().skip((page-1)*pageSize).limit(pageSize);
        await this.ctx.render('/admin/product/index',{
            list:result,
            totalPages:totalPages,
            page:page
        });
    }
    
    async add() {
        await this.ctx.render('/admin/product/add');
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
        let product =new this.ctx.model.Product(Object.assign(files,parts.field));
        let result=await product.save();
        await this.success('/admin/product','增加产品成功');
    }

    async edit() {
        let id = this.ctx.query.id;
        let result = await this.ctx.model.Product.find({'_id':id});
        await this.ctx.render('/admin/product/edit',{
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
        let product =await this.ctx.model.Product.updateOne({'_id':id},updateResult);
        await this.success('/admin/product','修改产品成功');
    }
   
}

module.exports = ProductController