const express = require('express');
const {photoController}=require("../../controllers/index")
const auth = require('../../middlewares/auth');
const {uploadPics,savePics}=require("../../middlewares/uploadDocument")
const router = express.Router();

router
  .route('/')
  .post(uploadPics("picture"),savePics,photoController.createPhoto)
  .get(photoController.getAllPhotos);

router
  .route('/:id')
  .get(photoController.getPhoto)
  .patch(uploadPics("picture"),savePics, photoController.updatePhoto)
  .delete(photoController.deletePhoto);
module.exports = router;  