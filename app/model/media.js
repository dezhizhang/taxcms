'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d=new Date();
    const MediaSchema = new Schema({
      title: { type: String  }, 
      media_img: { type: String  },   
      description: { type: String  },
      add_time: {           
        type:Number,        
        default: d.getTime()    
       }
    });
   
    return mongoose.model('Media', MediaSchema,'media');
}