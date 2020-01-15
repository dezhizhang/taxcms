'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const GoodsTypeAttrSchema = Schema({
        cate_id:{ type:Schema.Types.ObjectId },
        title:{ type:String },
        attr_type:{ type:String },  //1,input 2,textarea 3,select
        attr_value:{ type:String },
        status:{
            type:Number,
            default:1
        },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('GoodsTypeAttr',GoodsTypeAttrSchema,'goods_type_attr');
}