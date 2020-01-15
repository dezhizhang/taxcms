'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const d = new Date();
    const DetailSchema = new Schema({
        detail_id:{  type:Schema.Types.ObjectId },
        focus_img:{ type:Array },
        title:{ type:String },
        price:{ type:String },
        freight:{ type:String },
        sales:{ type:String },
        inventory:{type:String },
        type:{type:String },
        sort:{ 
            type:Number,
            default:100
         },
        discount:{ type:String },
        detail_img:{ type:Array },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('Detail',DetailSchema,'detail');
}