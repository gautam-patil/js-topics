const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const appSchema = mongoose.Schema(
  {
    appName:{
      type: String,
      trim: true,
      required:true
    },
    description: {
      type: String,
      trim: true,
      required:true
    },
    icon: {
        type: String,
      },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active" 
    },
    playstoreLink:{
        type:String,
        required:true
    },
    appstoreLink:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
appSchema.plugin(toJSON);
appSchema.plugin(paginate);


/**
 * @typedef Apps
 */
const Apps = mongoose.model('Apps', appSchema);

module.exports = Apps;
