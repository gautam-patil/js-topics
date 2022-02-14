const express = require('express');
const {settingsController}=require("../../controllers/index")
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const settingsValidation = require('../../validations/settings.validation');
const router = express.Router();

router
  .route('/')
  .post(auth("manageSettings"),validate(settingsValidation.createSetting),settingsController.createSettings)
  .get(validate(settingsValidation.getSettings),settingsController.getAllSettings);

router
  .route('/:id')
  .get(validate(settingsValidation.getSetting), settingsController.getSettings)
  .patch(auth("manageSettings"),validate(settingsValidation.updateSetting), settingsController.updateSettings)
  .delete(auth("manageSettings"),validate(settingsValidation.deleteSetting), settingsController.deleteSettings);

module.exports = router;