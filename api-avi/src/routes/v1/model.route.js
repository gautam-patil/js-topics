const express = require('express');
const {modelController}=require("../../controllers/index")
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {uploadPics,savePics}=require("../../middlewares/uploadDocument")
const modelValidation = require('../../validations/model.validation');
const router = express.Router(); 

router
  .route('/')
  .post(auth('manageModels'),uploadPics("picture"),savePics,modelController.createModel)
  .get(validate(modelValidation.getModels),modelController.getAllModels);

router
  .route('/:id')
  .get(auth('getModels'),validate(modelValidation.getModel), modelController.getModel)
  .patch(auth('manageModels'),uploadPics("picture"),savePics, modelController.updateModel)
  .delete(auth('manageModels'),validate(modelValidation.deleteModel), modelController.softDeleteModel);  
module.exports = router; 