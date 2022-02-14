const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPackage = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        paymentStatus: Joi.string().default("paid"),
        price:Joi.number().required(),
        picture:Joi.string().required(),
        category:Joi.array(),
        hairstyles:Joi.array()
    }),
};

const getPackages = {
    query: Joi.object().keys({
    paymentStatus: Joi.string().valid("paid","free"),
    price:Joi.number(),
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  };
  
  const getPackage = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
      start: Joi.number().integer(),
      end: Joi.number().integer(),
    }),
  };
  
  const updatePackage = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        title: Joi.string(),
        description: Joi.string(),
        paymentStatus: Joi.string().default("paid"),
        price:Joi.number(),
        picture:Joi.string(),
        category:Joi.array(),
        hairstyles:Joi.array()
      })
      .min(1),
  };
  
  const deletePackage = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  module.exports = {
    createPackage,
    getPackages,
    getPackage,
    updatePackage,
    deletePackage,
  };
  