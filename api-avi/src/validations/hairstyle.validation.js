const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createHairstyle = {
    body: Joi.object().keys({
      name: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().default("active"),
        picture:Joi.string(),
        greyScle:Joi.string(),  
        packages: Joi.array(),
        category:Joi.array(),
    }),
};

const getHairstyles = {
    query: Joi.object().keys({
    status: Joi.string().valid("active","inactive"),
    packages: Joi.string().custom(objectId),
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),        
    }),
  };
  
  const getHairstyle = {
    params: Joi.object().keys({ 
      id: Joi.string().custom(objectId),
    }),
  };
  
  const updateHairstyle = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        greyScle:Joi.string(),
        name: Joi.string(),
        description: Joi.string(),
        status: Joi.string().default("active"),
        picture:Joi.string(),
        packages: Joi.array(),
        category:Joi.array()
      })
      .min(1),
  };
  
  const deleteHairstyle = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  module.exports = {
    createHairstyle,
    getHairstyles,
    getHairstyle,
    updateHairstyle,
    deleteHairstyle,
  };
  