const {getAll,getOne,createOne,updateOne,deleteOne,softDeleteOne}=require("../services/index").crudService;
const {Model}=require("../models");
const catchAsync=require("../utils/catchAsync")

exports.createModel=createOne(Model);
exports.updateModel=updateOne(Model);
exports.getModel=getOne(Model);
exports.deleteModel=deleteOne(Model);
// exports.deleteModel=catchAsync( async (req, res, next) => {
    
//     const doc = await Model.findByIdAndDelete(req.params.id);
  
//     if (!doc) {
//       throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
//     }
//     res.status(200).json({
//       status: "sucess",
//       data: null,
//     });
//   })
  exports.softDeleteModel=catchAsync( async (req, res, next) => {    
    const doc = await Model.findByIdAndUpdate(req.params.id,{status:'inactive'});
  
    if (!doc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
    }
    res.status(204).json({
      status: "sucess",
      data: null,
    });
  })  
//exports.softDeleteModel=softDeleteOne(Model);
//exports.getAllModels=getAll(Model);
exports.getAllModels = catchAsync( async (req, res, next) => {  
  let result = [];
  if(req.query.name){

    result = await Model.aggregate(
      [
        {
          '$match': {
            'status': 'active',   
            'name' : {$regex: req.query.name}
          }
        },
    ]  
  ).exec(); 
  }else{
  result = await Model.aggregate(
    [
      {
        '$match': {
          'status': 'active'
        }
      },    
    ]  
  ).exec(); 
  }
  
  
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
  }    
  res.status(200).json({
    status: "sucess",
    data: {result},
  });
})