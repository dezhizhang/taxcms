'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const ProductSchema = new Schema({
        product_url:{ type:String },
        description:{ type:String },
        price:{ type:String },
        product_type:{ type:String }, //1,热门，2主打
        sort:{type:Number,default:100},
        add_time:{
            type:String,
            default:d.getTime()
        }
    });
    return mongoose.model('Product',ProductSchema,'product');
}