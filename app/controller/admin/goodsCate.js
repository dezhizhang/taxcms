'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class GoodsCateController extends BaseController {
    async index() {
        let result = await this.ctx.model.GoodsCate.aggregate([
            {
                $lookup:{
                    from:'goods_cate',
                    localField:'_id',
                    foreignField:'pid',
                    as:'items'
                }
            },
            {
                $match:{
                    'pid':'0'
                }
            }
        ]);
        await this.ctx.render('/admin/goodsCate/index',{
            list:result
        })
    }
    async add() {
        let result = await this.ctx.model.GoodsCate.find({'pid':'0'});
        await this.ctx.render('/admin/goodsCate/add',{
            cateList:result
        });
    }
    async doAdd() {
        let files = {};       
        let parts = this.ctx.multipart({ autoFields: true });        
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
            });
            await this.service.tools.jimpImg(target,200,100)
           
        }      
        if(parts.field.pid!='0') {
            parts.field.pid =await this.app.mongoose.Types.ObjectId(parts.field.pid)
        }
        let goodsCate =new this.ctx.model.GoodsCate(Object.assign(files,parts.field));
        await goodsCate.save();
        await this.success('/admin/goodsCate','增加分类成功');
    }
    async edit() {
        let id = this.ctx.query.id;
        let cateList = await this.ctx.model.GoodsCate.find({'pid':'0'});
        let result = await this.ctx.model.GoodsCate.find({'_id':id});
        await this.ctx.render('/admin/goodsCate/edit',{
            list:result[0],
            cateList
        });
    }
    async doEdit() {
        let files = {};       
        let parts = this.ctx.multipart({ autoFields: true });        
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
            });
            await this.service.tools.jimpImg(target,200,100)
           
        }      
        if(parts.field.pid!='0') {
            parts.field.pid =await this.app.mongoose.Types.ObjectId(parts.field.pid)
        }
        let id = parts.field.id;
        let updateResult = Object.assign(files,parts.field)
        let goodsCate =await this.ctx.model.GoodsCate.updateOne({'_id':id},updateResult);
        await this.success('/admin/goodsCate','修改分类成功');

    }

}

module.exports = GoodsCateController;