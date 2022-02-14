const express = require('express');
const {purchasedPackageController}=require("../../controllers/index")
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const purchasedPackageValidation = require('../../validations/purchasedPackage.validation');
const router = express.Router();

router
  .route('/')
  .post(auth('managePurchasedPackages'),purchasedPackageController.createPurchasedPackage)
  .get(auth('getPurchasedPackages'),validate(purchasedPackageValidation.getPurchasedPackages),purchasedPackageController.getAllPurchasedPackages);

router
  .route('/:id')
  .get(auth('getPurchasedPackages'),validate(purchasedPackageValidation.getPurchasedPackage), purchasedPackageController.getPurchasedPackage)
  .patch(auth('managePurchasedPackages'),validate(purchasedPackageValidation.updatePurchasedPackage), purchasedPackageController.updatePurchasedPackage)
  .delete(auth('managePurchasedPackages'),validate(purchasedPackageValidation.deletePurchasedPackage), purchasedPackageController.deletePurchasedPackage);

module.exports = router;