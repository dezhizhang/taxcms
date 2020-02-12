'use strict';
const Controller = require('egg').Controller;
class TaxController extends Controller {
    async add() {
        let result = this.ctx.request.body;
        let data = new this.ctx.model.Tax(result);
        await data.save();
        this.ctx.body = {
            code:200,
            msg:'SUCCESS',
            data:null
        }
    }
    async list() {
        let { tax_id,status } = this.ctx.query;
        if(tax_id && status) {
            if(status == 'all') {
                let result =await this.ctx.model.Tax.find({'tax_id':tax_id});
                this.ctx.body = {
                    code:200,
                    msg:"SUCCESS",
                    data:result
                }
            } else {
                let result =await this.ctx.model.Tax.find({'tax_id':tax_id,'status':status});
                this.ctx.body = {
                    code:200,
                    msg:"SUCCESS",
                    data:result
                }
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