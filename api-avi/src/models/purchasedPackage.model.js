const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const purchasedPackageSchema = mongoose.Schema(
  {
    packages: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Package',
      required: true,
    }],
    user:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    }
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
purchasedPackageSchema.plugin(toJSON);
purchasedPackageSchema.plugin(paginate);


/**
 * @typedef PurchasedPackages
 */
const PurchasedPackages = mongoose.model('PurchasedPackages', purchasedPackageSchema);

module.exports = PurchasedPackages;
