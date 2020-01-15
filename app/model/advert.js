module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d=new Date();
    const AdvertSchema = new Schema({
      name: { type: String  },
      advert_img: { type: String  },   
      link: { type: String  },   
      sort: { type: Number  },   
      status: { type: Number,default:1  },    
      add_time: {           
        type:Number,        
        default: d.getTime()    
       }
    });
   
    return mongoose.model('Advert', AdvertSchema,'advert');
}