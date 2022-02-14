const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require("../utils/apiFeatures");
exports.deleteOne = (Model,checkOwner=false) =>catchAsync( async (req, res, next) => {
    try {
      if(req.user&&req.user.role=="user"&&checkOwner){
        const owners=await Model.findById(req.params.id).select("owners");
        if(owners.includes(req.user.id)){
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
        }
      }
      const doc = await Model.findByIdAndDelete(req.params.id);
  
      if (!doc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
      }
      res.status(204).json({
        status: "sucess",
        data: null,
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        error: err,
      });
    }
  });

  exports.softDeleteOne = (Model,checkOwner=false) =>catchAsync( async (req, res, next) => {
    try {
      if(req.user&&req.user.role=="user"&&checkOwner){
        const owners=await Model.findById(req.params.id).select("owners");
        if(owners.includes(req.user.id)){
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
        }
      }
      const doc = await Model.findByIdAndUpdate(req.params.id,{status:'inactive'});
  
      if (!doc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
      }
      res.status(204).json({
        status: "sucess",
        data: null,
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        error: err,
      });
    }
  });
  
  exports.updateOne = (Model,checkOwner=false) =>catchAsync( async (req, res, next) => {
    try {
      if(req.user&&req.user.role=="user"&&checkOwner){
        const owners=await Model.findById(req.params.id).select("owners");
        if(owners.includes(req.user.id)){
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
        }
      }
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

  
      if (!doc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
      }
  
      res.status(200).json({
        status: "sucess",
        data: {
          data: doc,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        error: err,
      });
    }
  });
  
  exports.createOne = (Model) => catchAsync( async (req, res, next) => {
    const doc = await Model.create({ ...req.body, createdOn: Date.now() });
  
    res.status(201).json({
      status: "sucesss",
      data: {
        data: doc,
      },
    });
  });
  
  exports.getOne = (Model, popOptions,selectOptions,checkOwner=false) =>catchAsync( async (req, res, next) => {
    try {
      if(req.user&&req.user.role=="user"&&checkOwner){
        const owners=await Model.findById(req.params.id).select("owners");
        if(owners.includes(req.user.id)){
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
        }
      }
      let query = Model.findById(req.params.id);
      if (query) query = query.select(selectOptions).populate(popOptions);
      const doc = await query;
  
      if (!doc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
        
      }
  
      res.status(200).json({
        status: "sucess",
  
        data: {
          data: doc,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        error: err,
      });
    }
  });
  
  exports.getAll = (Model, filter = {}) =>catchAsync( async (req, res, next) => {
    try {
      
    const features = new APIFeatures(Model.find(filter), req.query)
    .filter()    
    //.sort()
    //.allowDiskUse()
    .limitFields()
    .paginate();

  const docs = await features.query;
  
      res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        result: docs.length,
        data: {
          docs,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        error: err,
      });
    }
  });
  