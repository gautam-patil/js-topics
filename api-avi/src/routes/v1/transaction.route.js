const express = require('express');
const {transactionController}=require("../../controllers/index")
const auth = require('../../middlewares/auth');
const {uploadPics,savePics}=require("../../middlewares/uploadDocument")

const router = express.Router();

router
  .route('/')
  .post(auth('manageTransactions'),transactionController.createTransaction)
  .get(auth('getTransactions'),transactionController.getAllTransactions);

router
  .route('/:id')
  .get(auth('getTransactions'),transactionController.getTransaction)
  .patch(auth('manageTransactions'),transactionController.updateTransaction)
  .delete(auth('manageTransactions'),transactionController.softDeleteTransaction);

module.exports = router;