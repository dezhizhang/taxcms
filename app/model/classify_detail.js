'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const d = new Date();
    const ClassifyDetailSchema = new Schema({
        title:{ type:String },
        price:{ type:String },
        classify_id:{ type:String },
        classify_img:{ type:String },
        sort:{ type:Number },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('ClassifyDetail',ClassifyDetailSchema,'classify_detail');
}