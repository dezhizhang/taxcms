'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        let { detail_id,type } = this.ctx.query;
        let result = await this.ctx.model.Detail.find({'detail_id':detail_id});
        await this.ctx.render('/admin/detail/index',{
            list:result,
            detail_id,
            type
        })

    }
    async add() {
        let {detail_id, type} = this.ctx.query;
        let title = '';
        if(type == 1) {
            let result = await this.ctx.model.Main.find({'_id':detail_id});
            title = result[0].title
        } else if(type == 2) {
            let result = await this.ctx.model.Product.find({'_id':detail_id});
            title = result[0].description
        } else if(type == 3) {
            let result = await this.ctx.model.ClassifyDetail.find({'_id':detail_id});
            title = result[0].title
        }
        let detailResult = await this.ctx.model.Detail.find({'detail_id':detail_id});
        await this.ctx.render('/admin/detail/add',{
            title,
            detail_id,
            type
        });
      
    }
    async doAdd() {
        let result = this.ctx.request.body;
        let { detail_id } = result;
        let detail = new this.ctx.model.Detail(result);
        detail.save();
        await this.success(`/admin/detail?detail_id=${detail_id}`,'增加商品详情成功');
    }
    async edit() {
        
        let { id,type,detail_id } = this.ctx.query;
        let title = '';
        if(type == 1) {
            let result = await this.ctx.model.Main.find({'_id':detail_id});
            title = result[0].title
        } else {
            let result = await this.ctx.model.Product.find({'_id':detail_id});
            title = result[0].title
        }
        
        let result = await this.ctx.model.Detail.find({'_id':id});
        await this.ctx.render('/admin/detail/edit',{
            list:result[0],
            title,
            detail_id,
            id,
            type
        })
    }
    async doEdit() {
       let result = this.ctx.request.body;
       let {id,type,detail_id } = result;
       let updateDetail = await this.ctx.model.Detail.updateOne({'_id':id},result);
       await this.success(`/admin/detail?detail_id=${detail_id}&type=${type}`,'修改商品详情成功');

    }
    async detailUploadImage() {
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
        this.ctx.body={
            link:files.file
        }
    }
   
}

module.exports = MainController