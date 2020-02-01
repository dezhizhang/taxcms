'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const TaxSchema = new Schema({
        company_img:{ type:String },
        companyName:{ type:String },
        socialCode:{ type:String },
        address:{ type:String },
        contact:{ type:String },
        tax_id:{ type:Schema.Types.ObjectId },
        inform_time:{
            type:Number,
            default:d.getTime()
        },
        description:{ type:String },
        status:{
            type:Number,
            default:1  //1表示未完成,2表示完成
        },
        add_time:{
            type:Number,
            default:d.getTime()
        }

    });
    return mongoose.model('Tax',TaxSchema,'tax');
}