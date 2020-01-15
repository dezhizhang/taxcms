'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const d = new Date();
    const MainSchema = new Schema({
        title:{ type:String },
        price:{ type:String },
        main_id:{ type:String },
        main_img:{ type:String },
        type:{
            type:Number,
            default:1       //1主打产品，2分类产品
        },
        sort:{ type:Number },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('Main',MainSchema,'main');
}