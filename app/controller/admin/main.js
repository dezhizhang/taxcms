'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        let result = await this.ctx.model.Main.find();
        await this.ctx.render('/admin/main/index',{
            list:result
        });
    }
    async add() {
        await this.ctx.render('/admin/main/add');
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
        let main =new this.ctx.model.Main(Object.assign(files,parts.field));
        let result=await main.save();
        await this.success('/admin/main','增加主打产品成功');
    }
    async edit() {
        let id = this.ctx.query.id;
        let result = await this.ctx.model.Main.find({'_id':id});
        await this.ctx.render('/admin/main/edit',{
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
        let main =await this.ctx.model.Main.updateOne({'_id':id},updateResult);
        await this.success('/admin/main','修改主打产品成功');
    }
    //详情
    async detail() {
        await this.ctx.render('/admin/main/detail')
    }
}

module.exports = MainController