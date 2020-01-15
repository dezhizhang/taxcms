'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class FocusController extends BaseController {
    async index() {
        let result = await this.ctx.model.Focus.find();
        await this.ctx.render('/admin/focus/index',{
            list:result
        });
    }
    async add() {
        await this.ctx.render('/admin/focus/add');
        
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
        let focus =new this.ctx.model.Focus(Object.assign(files,parts.field));
        let result=await focus.save();
        await this.success('/admin/focus','增加轮播图成功');
    }
    //修改
    async edit() {
        let id = this.ctx.query.id;
        let result = await this.ctx.model.Focus.find({'_id':id});
        await this.ctx.render('/admin/focus/edit',{
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
        let result =await this.ctx.model.Focus.updateOne({"_id":id},updateResult);
        await this.success('/admin/focus','修改轮播图成功');
    }
}

module.exports = FocusController;
