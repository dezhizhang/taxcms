'use strict';

const BaseController = require('./base');
class GoodsTypeController extends BaseController {
    async index() {
        //后台主页
        let result = await this.ctx.model.GoodsType.find();
        await this.ctx.render('/admin/goodsType/index',{
            list:result
        });
    }
    //增加
    async add() {
        await this.ctx.render('/admin/goodsType/add');
    }
    //增加提交数据
    async doAdd() {
       let result = this.ctx.request.body;
       let goodsType = new this.ctx.model.GoodsType(result);
       await goodsType.save();
       await this.success('/admin/goodsType','增加商品类型成功');

    }
    //修改
    async edit() {
        let id = this.ctx.query.id;
        let result = await this.ctx.model.GoodsType.find({'_id':id});
        await this.ctx.render('/admin/goodsType/edit',{
            list:result[0]
        });
    }
    //修改提交数据
    async doEdit() {
        let result = this.ctx.request.body;
        let id = result.id;
        let goodsType = await this.ctx.model.GoodsType.updateOne({'_id':id},result);
        await this.success('/admin/goodsType','修改商品成功');
    }
}

module.exports = GoodsTypeController