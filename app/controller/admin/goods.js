'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        
        await this.ctx.render('/admin/goods/index')
    }
    async add() {
        let goodsCate = await this.ctx.model.GoodsCate.aggregate([
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
        let goodsColor = await this.ctx.model.GoodsColor.find({});
        let goodsType = await this.ctx.model.GoodsType.find({});
        await this.ctx.render('/admin/goods/add',{
            goodsCate,
            goodsColor,
            goodsType
        });
    }
    //获取商品类型属性
    async goodsTypeAttr() {
        let cate_id = this.ctx.query.cate_id;
        if(cate_id&&cate_id!='0'){
            let result = await this.ctx.model.GoodsTypeAttr.find({'cate_id':cate_id});
            this.ctx.body = {
                code:200,
                msg:'查询成功',
                data:result,
                success:true
            }
        } else{
            this.ctx.body = {
                code:404,
                msg:'传入的参数有误',
                data:null,
                success:true
            }
        }
    }
    //上传商品图片
    async goodsUploadImage() {
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
        this.ctx.body={
            link:files.file
        }
    }
    //上传商品图片
    async goodsUploadPhoto() {
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
        console.log()
    }
    async edit() {

    }
    async doEdit() {

    }
}

module.exports = MainController