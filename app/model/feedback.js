'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const FeedBackSchema = new Schema({
        email:{ type:String },
        description:{ type:String },
        add_time:{
            type:Number,
            default:d.getTime()
        }

    });
    return mongoose.model('FeedBack',FeedBackSchema,'feedback');
}