'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const UserSchema = new Schema({
        password:{ type:String },
        phone:{ type:String },
        user_name:{ type:String },
        user_img:{ type:String },
        add_time:{
            type:Number,
            default:d.getTime()
        }

    });
    return mongoose.model('User',UserSchema,'user');
}