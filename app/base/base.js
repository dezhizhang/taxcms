'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    async getUserInfo() {
        return {
            name:'周华建',
            age:22
        }
    }
    async success(url) {
        await this.ctx.render('public/success',{
            url:url
        });
    }
    async error(url) {
        await this.ctx.render('public/error',{
            url:url
        })
    }
}

module.exports = BaseController;
