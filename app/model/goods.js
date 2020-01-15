'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const GoodsSchema = new Schema({
        title:{ type:String },
        sub_title:{ type:String },
        goods_sn:{ type:String },
        cate_id:{ type:Schema.Types.ObjectId },
        click_count:{
            type:Number,
            default:1
        },
        goods_number:{
            type:Number,
            default:100
        },
        shop_price:{ type:String },
        market_price:{ type:String },
        relation_goods:{ type:String },
        goods_attrs:{ type:String },
        goods_version:{ type:String },
        goods_img:{ type:String },
        goods_gift:{ type:String },
        goods_fitting:{ type:String },
        goods_color:{ type:String },
        goods_keywords:{ type:String },
        goods_desc:{ type:String },
        goods_content:{ type:String },
        sort:{
            type:Number,
            default:100
        },
        is_delete:{
            type:Boolean
        },
        is_hot:{
            type:Number
        },
        is_new:{
            type:Number
        },
        goods_type_id:{
            type:Schema.Types.ObjectId
        },
        status:{
            type:Number,
            default:1
        },
        add_time:{
            type:Number,
            default:d.getTime()
        }


    });
    return mongoose.model('Goods',GoodsSchema,'goods');
}