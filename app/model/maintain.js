'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const MaintainSchema = Schema({
        username:{ type:String },
        mobile:{ type:String },
        address:{ type:String },
        description:{ type:String },
        status:{ type:Number,default:1 },
        image_url:{ type:String },
        add_time:{
           type:Number,
           default:d.getTime()
        },
    });
    return mongoose.model('Maintain',MaintainSchema,'maintain');
}