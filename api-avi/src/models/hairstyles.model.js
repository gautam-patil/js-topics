const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Package=require("./package.model")
const hairstyleSchema = mongoose.Schema(
  {
    packages: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Packages',
    }],
    name:{
      type: String,
      trim: true,
      required:true
    },
    description: {
      type: String,
      trim: true,
      required:true
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },
    picture:{
        type:String,
        required:true
    },
    greyScale:{
        type:String,
        required:true
    },
    mergedPicture:{
      type:String,    
  },    
    category:[{
      type:mongoose.Schema.ObjectId,
      ref:"Category"
    }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
hairstyleSchema.plugin(toJSON);
hairstyleSchema.plugin(paginate);

hairstyleSchema.pre(/^find/, function (next) {
  // this points to current query

  this.find({ status: { $ne: 'inactive' } });
  next();
});


/**
 * @typedef Hairstyles
 */
const Hairstyles = mongoose.model('Hairstyles', hairstyleSchema);

module.exports = Hairstyles;
