
'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const UserInfoSchema = new Schema({
        openid:{ type:String },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('UserInfo',UserInfoSchema,'user_info');
}

