'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const RoleSchema = Schema({
        title:{ type:String },
        description:{ type:String },
        status:{ type:Number,default:1 },
        add_time:{
           type:Number,
           default:d.getTime()
        },
    });
    return mongoose.model('Role',RoleSchema,'role');
}