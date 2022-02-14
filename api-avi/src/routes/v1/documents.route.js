const express = require('express');
const {documentController}=require("../../controllers/index")
const auth = require('../../middlewares/auth');
// const {uploadPics,savePics}=require("../../middlewares/uploadDocument")
const validate = require('../../middlewares/validate');
const documentValidation = require('../../validations/document.validation');
const router = express.Router();

router
  .route('/')
  .post(auth("manageRecents"),validate(documentValidation.createDocument),documentController.createDocument)
  .get(auth("getRecents"),validate(documentValidation.getAllDocuments),documentController.getAllDocuments);

router
  .route('/:id')
  .get(auth("getRecents"),validate(documentValidation.getDocument), documentController.getDocument)
  .patch(auth("manageRecents"),validate(documentValidation.updateDocument),documentController.updateDocument)
  .delete(auth("manageRecents"), validate(documentValidation.deleteDocument),documentController.deleteDocument);

module.exports = router;