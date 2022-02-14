const {getAll,getOne,createOne,updateOne,deleteOne}=require("../services/index").crudService;
const {App}=require("../models");

exports.createApp=createOne(App);
exports.updateApp=updateOne(App);
exports.getApp=getOne(App);
exports.deleteApp=deleteOne(App);
exports.getAllApps=getAll(App);