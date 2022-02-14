const {getAll,getOne,createOne,updateOne,deleteOne}=require("../services/index").crudService
const {Document}=require("../models")

exports.createDocument=createOne(Document)
exports.updateDocument=updateOne(Document)
exports.getDocument=getOne(Document)
exports.deleteDocument=deleteOne(Document)
exports.getAllDocuments=getAll(Document)