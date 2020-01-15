'use strict';
const Controller = require('egg').Controller;
class MaintainController extends Controller {
    async index() {
        let result = await this.ctx.model.Advert.find();
        this.ctx.body = {
            code:200,
            msg:'SUCCESS',
            data:result
        }
    }
    async save() {
        let result = this.ctx.request.body;
        if(result) {
            let cart = new this.ctx.model.Cart(result);
            await cart.save();
            this.ctx.body = {
                code:200,
                msg:'加入购物车成功',
                success:true
            }
        } else {
            this.ctx.body = {
                code:404,
                msg:'传入的参数有误',
                success:false
            }
        }
    }
    async list() {
        let { openid } = this.ctx.query;
        if(openid) {
            let list = await this.ctx.model.Cart.find({'openid':openid});
            this.ctx.body = {
                code:200,
                msg:'获取数据成功',
                data:list
            }
        } else {
            this.ctx.body = {
                code:404,
                msg:'传入的参数有误',
                data:null
            }
        }
    }
    async update() {
        let { id,number } = this.ctx.query;
        let result = await this.ctx.model.Cart.updateOne({'_id':id},{number:number});
        this.ctx.body = {
            code:200,
            msg:'更新商品数量成功',
            success:true
        }
    }
    async delete() {
        let { id } = this.ctx.query;
        if(id) {
            let result = await this.ctx.model.Cart.deleteOne({'_id':id});
            this.ctx.body = {
                code:200,
                msg:'删除购物车成功',
                success:true
            }
        } else {
            this.ctx.body = {
                code:404,
                msg:'传入的参数有误',
                success:false
            }
        }
    }
    async status() {
        let { id,checked } = this.ctx.query;
        if(id && checked) {
            let result = await this.ctx.model.Cart.updateOne({'_id':id},{checked:checked});
            this.ctx.body = {
                code:200,
                msg:'更新数据成功',
                success:true
            }
        } else {
            this.ctx.body = {
                code:404,
                msg:'传入的参数有误',
                success:false
            }
        }
    }

}

module.exports = MaintainController;