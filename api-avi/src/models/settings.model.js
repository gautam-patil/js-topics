const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const settingsSchema = mongoose.Schema(
  {
    combinedPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    title:{
      type:String,
      required:true
    },
    packages:[{
      type:mongoose.SchemaTypes.ObjectId,
      ref: 'Packages',
      required: true,
    }]
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
settingsSchema.plugin(toJSON);
settingsSchema.plugin(paginate);

settingsSchema.pre(/^find/, function (next) {
  this.populate({
    path:"packages",
  select:"-picture"});
  next();
});


/**
 * @typedef Settings
 */
const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
