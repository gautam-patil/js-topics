const express = require('express');
const {colorController}=require("../../controllers/index")
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const colorValidation = require('../../validations/color.validation');
const router = express.Router();

router
  .route('/')
  .post(validate(colorValidation.createColor),colorController.createColor)
  .get(validate(colorValidation.getColors),colorController.getAllColors);

router
  .route('/:id')
  .get(validate(colorValidation.getColor), colorController.getColor)
  .patch(auth("manageColors"),validate(colorValidation.updateColor), colorController.updateColor)
  .delete(auth("manageColors"),validate(colorValidation.deleteColor), colorController.deleteColor);

module.exports = router;