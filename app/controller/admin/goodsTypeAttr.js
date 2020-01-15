'use strict';

const BaseController = require('./base');
class CoodsTypeAttrController extends BaseController {
    async index() {
        let cate_id =this.app.mongoose.Types.ObjectId(this.ctx.query.id);
        let result = await this.ctx.model.GoodsTypeAttr.aggregate([
            {
                $lookup:{
                    from:'goods_type',
                    localField:'cate_id',
                    foreignField:'_id',
                    as:'items'
                }
            },
            {
                $match:{
                    'cate_id':cate_id
                }
            }
        ])
        await this.ctx.render('/admin/goodsTypeAttr/index',{
            list:result,
            cate_id
        })

    }
    async add() {
        let cate_id = this.ctx.query.id;
        let result = await this.ctx.model.GoodsType.find();
        await this.ctx.render('/admin/goodsTypeAttr/add',{
            list:result,
            cate_id
        })
    }
   async doAdd() {
        let result = this.ctx.request.body;
        let cate_id = result.cate_id;
        let goodsTypeAttr = new this.ctx.model.GoodsTypeAttr(result);
        await goodsTypeAttr.save();
        await this.success(`/admin/goodsTypeAttr?id=${cate_id}`,'增加商品属性成功');
   }
   async edit() {
        let id = this.ctx.query.id;
        let result = await this.ctx.model.GoodsTypeAttr.find({'_id':id});
        let goodsType = await this.ctx.model.GoodsType.find();
        await this.ctx.render('/admin/goodsTypeAttr/edit',{
            list:result[0],
            goodsType:goodsType
        })
   }
   async doEdit() {
        let result = this.ctx.request.body;
        let id = result.id;
        let cate_id = result.cate_id;
        let goodsTypeAttr = await this.ctx.model.GoodsTypeAttr.updateOne({'_id':id},result);
        await this.success(`/admin/goodsTypeAttr?id=${cate_id}`,'修改商品属性成功');
   }
}

module.exports = CoodsTypeAttrController