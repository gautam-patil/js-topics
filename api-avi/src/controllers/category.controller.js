const {getAll,getOne,createOne,updateOne,deleteOne}=require("../services/index").crudService;
const {Category}=require("../models");

exports.createCategory=createOne(Category);
exports.updateCategory=updateOne(Category);
exports.getCategory=getOne(Category);
exports.deleteCategory=deleteOne(Category);
exports.getAllCategorys=getAll(Category);