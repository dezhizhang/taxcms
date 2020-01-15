'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    //成功
    async success(redirectURL,message) {
        await this.ctx.render('admin/public/success',{
            redirectURL:redirectURL,
            message:message || '操作成功'
        })
    }
    //失败
    async error(redirectURL,message) {
        await this.ctx.render('admin/public/error',{
            redirectURL:redirectURL,
            message:message || '操作失败'
        })
    }
    //验证
    async verify() {
        let captcha = await this.service.tools.captcha();
        this.ctx.response.type = 'image/svg+xml';
        this.ctx.body = captcha.data;
    }
     //公共的删除方法
    async delete() {
        let result = this.ctx.query;
        let id = result.id;
        let model = result.model;
        await this.ctx.model[model].deleteOne({'_id':id});
        //返回上一页
        this.ctx.redirect(this.ctx.state.prevPage);
    }
    //改变状态的方法
    async changeStatus() {
        let json = {};
        let data = this.ctx.request.query;
        let id = data.id;
        let attr = data.attr;
        let model = data.model;
        let result = await this.ctx.model[model].find({'_id':id});
        if(result.length > 0) {
            if(result[0][attr] == 1) {
                json = {
                    [attr]:0
                }
            } else {
                json = {
                    [attr]:1
                }
            }

            let updateResult = await this.ctx.model[model].updateOne({'_id':id},json);
            if(updateResult) {
                 this.ctx.body = {
                    code:200,
                    msg:'更改状态成功',
                    success:true

                 }
            }else {
                this.ctx.body = {
                    code:404,
                    msg:'更新状态失败',
                    success:false
                }
            }

        } else {
            this.ctx.body = {
                code:404,
                msg:'参数有误',
                success:false
            }
        }
    }
    //改变数量
    async editNumber() {
        let json = {};
        let result = this.ctx.query;
        let id = result.id;
        let attr = result.attr;
        let model = result.model;
        let num = result.num;
        let data = await this.ctx.model[model].find({'_id':id});
        if(data.length > 0) {
            json = {
                [attr]:num
            }
            let updateResult = await this.ctx.model[model].updateOne({'_id':id},json);
            if(updateResult) {
                this.ctx.body = {
                    code:200,
                    msg:'更新成功',
                    success:true
                }
            } else {
                this.ctx.body = {
                    code:500,
                    msg:'更新失败',
                    success:false
                }
            }
        } else {
            this.ctx.body = {
                code:404,
                msg:'参数错误',
                success:false
            }
        }


    }
}

module.exports = BaseController;
