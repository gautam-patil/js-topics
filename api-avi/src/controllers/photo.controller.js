const {getAll,getOne,createOne,updateOne,deleteOne}=require("../services/index").crudService;
const {Photo}=require("../models");

exports.createPhoto=createOne(Photo);
exports.updatePhoto=updateOne(Photo);
exports.getPhoto=getOne(Photo);
exports.deletePhoto=getOne(Photo);
exports.getAllPhotos=getAll(Photo);