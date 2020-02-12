'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const TaxSchema = new Schema({
        company_name:{ type:String },
        social_code:{ type:String },
        address:{ type:String },
        phone:{ type:String },
        contact:{ type:String },
        tax_id:{ type:String },
        status:{
            type:Number,
            default:0  //0表示未完成,1表示完成
        },
        add_time:{
            type:Number,
            default:d.getTime()
        }

    });
    return mongoose.model('Tax',TaxSchema,'tax');
}