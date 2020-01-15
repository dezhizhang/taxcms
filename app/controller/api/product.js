'use strict';
const Controller = require('egg').Controller;
class ProductController extends Controller {
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
    //主打产品
    async list() {
        let page = this.ctx.query.page;
        let pageSize = 10;
        let totalNum=await this.ctx.model.Goods.find({}).count();
        let totalPage = Math.ceil(totalNum/pageSize)
        let productResult = await this.ctx.model.Product.find({'product_type':'2'}).skip((page -1) * pageSize).limit(pageSize);
        this.ctx.body = {
            code:200,
            msg:'获取产品列表成功',
            success:true,
            data:productResult,
            page,
            totalPage
        }
    }

}

module.exports = ProductController;