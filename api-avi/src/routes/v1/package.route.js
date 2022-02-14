const express = require('express');
const {packageController}=require("../../controllers/index")
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const packageValidation = require('../../validations/package.validation');
const {uploadPics,savePics}=require("../../middlewares/uploadDocument")
const router = express.Router();

router
  .route('/')
  .post(auth('managePackages'),uploadPics("picture"),savePics,packageController.createPackage)
  .get(packageController.getAllPackages);

router      
  .route('/:id/page/:start/:end')
  .get(validate(packageValidation.getPackage), packageController.getPackage)  
  router.patch('/:id',auth('managePackages'),uploadPics("picture"),savePics, packageController.updatePackage)
  router.delete('/:id',auth('managePackages'),validate(packageValidation.deletePackage), packageController.softDeletePackage);
  router.patch('/:pkgId/removeHairstyle/:hairstyleId',packageController.removeHairstyleFromPackage);
  router.get('/:id',validate(packageValidation.getOnePackage), packageController.getOnePackage)  

router.patch('/:pkgId/addHairstyle/:hairstyleId',packageController.addHairstyleToPackage)
module.exports = router;  