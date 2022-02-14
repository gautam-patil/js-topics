const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const transactionSchema = mongoose.Schema(
  {  
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    chargeId:{
        type:String,
    },
    createdOn: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["success","fail"],
      required:true
    },
    description: {
      type: String,
      required:true
    },
    packages:[{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Packages',
      required: true,
    }]
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
transactionSchema.plugin(toJSON);

transactionSchema.pre(/^find/, function (next) {
  // this points to current query

  this.populate({
    path:"packages",
  select:"-picture"}).populate("user");
  next();
});
/**
 * @typedef Transaction
 */
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
