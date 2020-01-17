'use strict';
const Controller = require('egg').Controller;
class MediaController extends Controller {
    //热门产品
    async hot() {
        let result = await this.ctx.model.Product.find({'product_type':'1'});
        this.ctx.body = {
            code:200,
            msg:'SUCCESS',
            success:true,
            data:result
        }
    }
    //媒体列表
    async list() {
        let page = this.ctx.query.page;
        if(!page) {
            this.ctx.body = {
                code:404,
                msg:"传入参数有误",
                data:null
            }
            return
        }
        let pageSize = 10;
        let totalNum=await this.ctx.model.Media.find({}).count();
        let totalPage = Math.ceil(totalNum/pageSize)
        let result = await this.ctx.model.Media.find().skip((page -1) * pageSize).limit(pageSize);
        this.ctx.body = {
            code:200,
            msg:'获取媒体成功',
            success:true,
            data:result,
            page,
            totalPage
        }
    }
    //媒体详情
    async detail() {
        let { id } = this.ctx.query;
        if(!id) {
            this.ctx.body = {
                code:404,
                msg:"传入的参数有误",
                data:null
            }
            return
        }
        let result = await this.ctx.model.Media.find({"_id":id});
        this.ctx.body = {
            code:200,
            msg:"获取媒体详情成功",
            data:result[0]
        }
    }

}

module.exports = MediaController;