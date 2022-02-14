const {getAll,getOne,createOne,updateOne,deleteOne,softDeleteOne}=require("../services/index").crudService;
const {Transaction}=require("../models");

exports.createTransaction=createOne(Transaction);
exports.updateTransaction=updateOne(Transaction);
exports.getTransaction=getOne(Transaction);
exports.deleteTransaction=deleteOne(Transaction);
exports.softDeleteTransaction=softDeleteOne(Transaction);
exports.getAllTransactions=getAll(Transaction);