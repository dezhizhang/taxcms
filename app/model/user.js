'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const UserSchema = new Schema({
        password:{ type:String },
        phone:{ type:String },
        userName:{ type:String },
        companyName:{ type:String },
        socialCode:{ type:String },
        address:{ type:String },
        contact:{ type:String },
        inform_time:{
            type:Number,
            default:d.getTime()
        },
        description:{ type:String },
        status:{
            type:Number,
            default:1  //1表示未完成,2表示完成
        },
        add_time:{
            type:Number,
            default:d.getTime()
        }

    });
    return mongoose.model('User',UserSchema,'user');
}