'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const CompanySchema = new Schema({
        company_url:{ type:String },
        description:{ type:String },
        name:{ type:String },
        sort:{type:Number,default:100},
        add_time:{
            type:String,
            default:d.getTime()
        }
    });
    return mongoose.model('Company',CompanySchema,'company');
}