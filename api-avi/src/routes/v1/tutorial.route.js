const express = require('express');
const {tutorialController}=require("../../controllers/index")
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {uploadPics,savePics}=require("../../middlewares/uploadDocument")
const tutorialValidation = require('../../validations/tutorial.validation');
const router = express.Router(); 

router
  .route('/')
  .post(auth('manageTutorials'),uploadPics("picture"),savePics,tutorialController.createTutorial)
  .get(validate(tutorialValidation.getTutorials),tutorialController.getAllTutorials);

router
  .route('/:id')
  .get(validate(tutorialValidation.getTutorial), tutorialController.getTutorial)
  .patch(uploadPics("picture"),savePics, tutorialController.updateTutorial)
  .delete(validate(tutorialValidation.deleteTutorial), tutorialController.softDeleteTutorial);  
module.exports = router; 