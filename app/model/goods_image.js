'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    let d = new Date();

    const GoodsImageSchema = new Schema({
        goods_id:{ type:Schema.Types.Mixed },
        img_url:{ type:String },
        sort:{ type:Number },
        color_id:{ type:Schema.Types.Mixed },
        status:{ 
            type:Number,
            default:1
        },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('GoodsImage',GoodsImageSchema,'goods_image');
}