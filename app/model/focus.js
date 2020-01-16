'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d=new Date();
    const FocusSchema = new Schema({
      title: { type: String  }, 
      focus_img: { type: String  },   
      link: { type: String  },   
      sort: { type: Number  },   
      status: { type: Number,default:1  },    
      add_time: {           
        type:Number,        
        default: d.getTime()    
       }
    });
   
    return mongoose.model('Focus', FocusSchema,'focus');
}