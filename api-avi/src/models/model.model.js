const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const modelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category:[{
      type:mongoose.Schema.ObjectId,
      ref:"Category"
    }],
    picture: {
      type: String,
      required: true,
    },
    status:{
      type:String,
      enum:["active","inactive"],
      default:"active"
  },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
modelSchema.plugin(toJSON);
modelSchema.plugin(paginate);

modelSchema.pre(/^find/, function (next) {
  // this points to current query

  this.find({ status: { $ne: 'inactive' } });
  next();
});
/**
 * @typedef Model
 */
const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
