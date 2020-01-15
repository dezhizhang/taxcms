'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const ContactSchema = Schema({
        username:{ type:String },
        mobile:{ type:String },
        wechat:{ type:String },
        industry:{ type:String },
        budget:{ type:String },
        status:{ type:Number,default:1 },
        add_time:{
           type:Number,
           default:d.getTime()
        },
    });
    return mongoose.model('Contact',ContactSchema,'contact');
}