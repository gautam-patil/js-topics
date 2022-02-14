const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const tutorialSchema = mongoose.Schema(
  {
    name:{
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
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tutorialSchema.plugin(toJSON);
tutorialSchema.plugin(paginate);

tutorialSchema.pre(/^find/, function (next) {
  // this points to current query

  this.find({ status: { $ne: 'inactive' } });
  next();
});


/**
 * @typedef Tutorials
 */
const Tutorials = mongoose.model('Tutorials', tutorialSchema);

module.exports = Tutorials;
