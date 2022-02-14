const express = require('express');
const {appController}=require("../../controllers/index")
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const appValidation = require('../../validations/app.validation');
const {uploadPics,saveIcon}=require("../../middlewares/uploadDocument")
const router = express.Router();

router
  .route('/')
  .post(auth("manageOtherApps"),uploadPics("icon"),saveIcon,validate(appValidation.createApp),appController.createApp)
  .get(auth("getOtherApps"),validate(appValidation.getApps),appController.getAllApps);
  
router
  .route('/:id')
  .get(auth("getOtherApps"),validate(appValidation.getApp), appController.getApp)
  .patch(auth("manageOtherApps"),uploadPics,saveIcon,validate(appValidation.updateApp), appController.updateApp)
  .delete(auth("manageOtherApps"),validate(appValidation.deleteApp), appController.deleteApp);

module.exports = router;