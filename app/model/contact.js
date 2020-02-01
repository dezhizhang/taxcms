'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const ContactSchema = Schema({
        wechat:{ type:String },
        mobile:{ type:String },
        qq:{ type:String },
        email:{ type:String },
        sort: { type: Number  },   
        add_time:{
           type:Number,
           default:d.getTime()
        },
    });
    return mongoose.model('Contact',ContactSchema,'contact');
}