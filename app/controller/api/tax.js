'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const Controller = require('egg').Controller;
class TaxController extends Controller {
    async upload() {
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
        let maintain =new this.ctx.model.Tax(Object.assign(files,parts.field));
        let result=await maintain.save();
        this.ctx.body = {
            code:200,
            msg:'上传成功',
            success:true,
            data:null
        }
    }
    async list() {
        let { tax_id } = this.ctx.query;
        if(tax_id) {
            let result =await this.ctx.model.Tax.find({'tax_id':tax_id});
            this.ctx.body = {
                code:200,
                msg:"SUCCESS",
                data:result
            }
        } else {
            this.ctx.body = {
                code:400,
                msg:"传入的参数有误",
                data:null
            }
        }

    }
    async info() {
        let { tax_id } = this.ctx.query;
        if(tax_id) { 
            let list =await this.ctx.model.Tax.find({'tax_id':tax_id});
            let notTax = 0;
            let complete = 0;
            let total = list.length;
           
            for(let i=0;i < list.length;i++) {
                if(list[i].status == 0) {
                    notTax++;
                } else if(list[i].status == 1) {
                    complete++;
                }
            }
            this.ctx.body = {
                code:200,
                msg:'SUCCESS',
                data:{
                    notTax,
                    complete,
                    total
                }
            }
        } else {
            this.ctx.body = {
                code:404,
                msg:"传入的参数有误",
                data:null
            }
        }
    }

}

module.exports = TaxController;