const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const colorSchema = mongoose.Schema(
  {
    red: {
      type: Number,
      required: true,
    },
    green: {
      type: Number,
      required: true,
    },
    blue: {
      type: Number,
      required: true,
    },
    strength: {
      type: Number,
    },
    picture:{
      type:String,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
colorSchema.plugin(toJSON);
colorSchema.plugin(paginate);


/**
 * @typedef Colors
 */
const Colors = mongoose.model('Colors', colorSchema);

module.exports = Colors;
