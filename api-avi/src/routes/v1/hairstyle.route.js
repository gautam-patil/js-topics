const express = require('express');
const {hairstyleController}=require("../../controllers/index")
const {packageController}=require("../../controllers")
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const hairstyleValidation = require('../../validations/hairstyle.validation');
const {uploadMultiple, saveWithGreyScale}=require("../../middlewares/uploadDocument")

const router = express.Router();

router
.route('/')
.post(auth("manageHairstyles"),uploadMultiple,saveWithGreyScale,hairstyleController.createHairstyle)
router
  .get("/admin",hairstyleController.getAllHairstylesAdmin);

// router.route('/byPackage/:id').get(packageController.getHairstyleByPackage)
router
  .route('/:id')
  .get(validate(hairstyleValidation.getHairstyle), hairstyleController.getHairstyle)
  .patch(auth("manageHairstyles"),uploadMultiple,saveWithGreyScale,hairstyleController.updateHairstyle)
  .delete(auth("manageHairstyles"),validate(hairstyleValidation.deleteHairstyle), hairstyleController.softDeleteHairstyle);

router
  .get("/page/:start/:end",validate(hairstyleValidation.getHairstyles),hairstyleController.getAllHairstyles);
  
router.get("/:id/:recent",hairstyleController.getHairstyleWithPicture)
router.get("/:id/:recent/:color",hairstyleController.getHairstyleWithPictureAndColor);
module.exports = router;