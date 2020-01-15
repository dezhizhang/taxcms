'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const ClassifySchema = new Schema({
        name:{ type:String },
        sort:{ type:Number },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('Classify',ClassifySchema,'classify');
}