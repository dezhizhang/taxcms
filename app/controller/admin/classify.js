'use strict';

const BaseController = require('./base');

class ClassifyController extends BaseController {
   
    async index() {
        let result = await this.ctx.model.Classify.find();
        await this.ctx.render('/admin/classify/index',{
            list:result
        })
    }
    async add() {
        await this.ctx.render('/admin/classify/add');
    }
    async doAdd() {
        let result = await this.ctx.request.body;
        let classify = new this.ctx.model.Classify(result);
        await classify.save();
        await this.success('/admin/classify','增加分类成功');
    }
    async edit() {
        let { id } = this.ctx.query;
        let result = await this.ctx.model.Classify.find({'_id':id});
        await this.ctx.render('/admin/classify/edit',{
            list:result[0]
        })
    }
    async doEdit() {
        let result = this.ctx.request.body;
        let { id } = result;
        let updateClassify = await this.ctx.model.Classify.updateOne({'_id':id},result);
        await this.success('/admin/classify','修改分类');

    }

}

module.exports = ClassifyController;
