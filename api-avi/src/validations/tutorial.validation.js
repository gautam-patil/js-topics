const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createTutorial = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        picture:Joi.string().required()        
    }),
};

const getTutorials = {
    query: Joi.object().keys({
      name: Joi.string(),
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  };
  
  const getTutorial = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  const updateTutorial = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
          name: Joi.string(),
          picture:Joi.string(),          
      })
      .min(1),
  };
  
  const deleteTutorial = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };
  
  module.exports = {
    createTutorial,
    getTutorials,
    getTutorial,
    updateTutorial,
    deleteTutorial,
  };
  