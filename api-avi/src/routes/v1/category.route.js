const express = require('express');
const {categoryController}=require("../../controllers/index")
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const router = express.Router();

router
  .route('/')
  .post(auth("manageCategorys"),validate(categoryValidation.createCategory),categoryController.createCategory)
  .get(validate(categoryValidation.getCategorys),categoryController.getAllCategorys);

router
  .route('/:id')
  .get(validate(categoryValidation.getCategory), categoryController.getCategory)
  .patch(auth("manageCategorys"),validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(auth("manageCategorys"),validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = router;