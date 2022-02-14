const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createSetting = {
    body: Joi.object().keys({
      combinedPrice: Joi.number().required(),
      packages:Joi.array().required(),
      title:Joi.string().required(),
      discountPrice: Joi.number().required(),
    }),
};

const getSettings = {
    query: Joi.object().keys({
        combinedPrice: Joi.number(),
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  };
  
  const getSetting = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  const updateSetting = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        combinedPrice: Joi.number().required(),
        packages:Joi.array(),
        title:Joi.string(),
        discountPrice: Joi.number().required(),
      })
      .min(1),
  };
  
  const deleteSetting = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  module.exports = {
    createSetting,
    getSettings,
    getSetting,
    updateSetting,
    deleteSetting,
  };
  