const { number } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const packageSchema = mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    title:{
      type:String,
      required:true
    },
    picture:{
      type:String,
      required:true
    },
    hairstyles: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Hairstyles',
    }],
    // hairstyles: [{
    //     type: String//mongoose.SchemaTypes.ObjectId,
    //     //ref: 'Hairstyles',
    //   }],    
    model: [{
      type: String,      
    }],    
    description: {
      type: String,
      trim: true,
      required:true
    },
    category:[{
      type:mongoose.Schema.ObjectId,
      ref:"Category"
    }],
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },
    paymentStatus:{
        type:String,
        enum:["paid","free"],
        default:"paid"
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
packageSchema.plugin(toJSON);
packageSchema.plugin(paginate);

packageSchema.pre(/^find/, function (next) {
  // this points to current query

  this.find({ status: { $ne: 'inactive' } });
  next();
});

/**
 * @typedef Packages
 */
const Packages = mongoose.model('Packages', packageSchema);

module.exports = Packages;
