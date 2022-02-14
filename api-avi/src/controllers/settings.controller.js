const {getAll,getOne,createOne,updateOne,deleteOne}=require("../services/index").crudService;
const {Settings}=require("../models");

exports.createSettings=createOne(Settings);
exports.updateSettings=updateOne(Settings);
exports.getSettings=getOne(Settings);
exports.deleteSettings=deleteOne(Settings);
exports.getAllSettings=getAll(Settings);