const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createColor = {
    body: Joi.object().keys({
      red: Joi.number().required(),
      green: Joi.number().required(),
      blue: Joi.number().required(),
      strength: Joi.number(),            
    }),
};

const getColors = {
    query: Joi.object().keys({
      red: Joi.number(),
      green: Joi.number(),
      blue: Joi.number(),
      strength: Joi.number(),
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  };
  
  const getColor = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  const updateColor = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        red: Joi.number(),
        green: Joi.number(),
        blue: Joi.number(),
        strength: Joi.number(),
      })
      .min(1),
  };
  
  const deleteColor = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  module.exports = {
    createColor,
    getColors,
    getColor,
    updateColor,
    deleteColor,
  };
  