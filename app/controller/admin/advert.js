'use strict';
const path=require('path');
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');

class AdvertController extends BaseController {
    async index() {
        let result = await this.ctx.model.Advert.find();
        await this.ctx.render('/admin/advert/index',{
            list:result
        });
    }
    async add() {
        await this.ctx.render('/admin/advert/add');
        
    }
    //轮播图交数据
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
            
        }      
        let advert =new this.ctx.model.Advert(Object.assign(files,parts.field));
        let result=await advert.save();
        await this.success('/admin/advert','增加广告图成功');
    }
    //修改
    async edit() {
        let id = this.ctx.query.id;
        let result = await this.ctx.model.Advert.find({'_id':id});
        await this.ctx.render('/admin/advert/edit',{
            list:result[0]
        });
    }
    //修改提交数据
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
        //修改操作
        let id=parts.field.id;
        let updateResult=Object.assign(files,parts.field);
        let result =await this.ctx.model.Advert.updateOne({"_id":id},updateResult);
        await this.success('/admin/advert','修改广告成功');
    }
}

module.exports = AdvertController;