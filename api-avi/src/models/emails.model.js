const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const emailsSchema = mongoose.Schema(
  {
    to: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
   
  },
  {
    timestamps: true,
  }
);


/**
 * @typedef Emails
 */
const Emails = mongoose.model('Emails', emailsSchema);

module.exports = Emails;
