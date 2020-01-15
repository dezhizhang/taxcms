'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const AdminSchema = Schema({
        username:{ type:String },
        password:{ type:String },
        mobile:{ type:String },
        email:{ type:String },
        status:{
            type:Number,
            default:1
        },
        role_id:{type:Schema.Types.ObjectId},
        add_time:{
           type:Number,
           default:d.getTime()
        },
        is_super:{ type:Number,default:1 }
    });
    return mongoose.model('Admin',AdminSchema,'admin');
}