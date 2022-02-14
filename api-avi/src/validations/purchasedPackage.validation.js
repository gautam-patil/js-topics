const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPurchasedPackage = {
    body: Joi.object().keys({
        user: Joi.string().custom(objectId).required(),
        packages:Joi.array().required(),
    }),
};

const getPurchasedPackages = {
    query: Joi.object().keys({
    user: Joi.string().custom(objectId),
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  };
  
  const getPurchasedPackage = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  const updatePurchasedPackage = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        user: Joi.string().custom(objectId),
        packages:Joi.array(),
      })
      .min(1),
  };
  
  const deletePurchasedPackage = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  module.exports = {
    createPurchasedPackage,
    getPurchasedPackages,
    getPurchasedPackage,
    updatePurchasedPackage,
    deletePurchasedPackage,
  };
  