'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const GoodsColorSchema = new Schema({
        color_name:{ type:String },
        color_value:{ type:String },
        description:{ type:String },
        status:{
            type:Number,
            default:1
        },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('GoodsColor',GoodsColorSchema,'goods_color');
}