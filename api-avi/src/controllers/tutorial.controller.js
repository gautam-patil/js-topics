const {getAll,getOne,createOne,updateOne,deleteOne,softDeleteOne}=require("../services/index").crudService;
const {Tutorial}=require("../models");
const catchAsync=require("../utils/catchAsync")

exports.createTutorial=createOne(Tutorial);
exports.updateTutorial=updateOne(Tutorial);
exports.getTutorial=getOne(Tutorial);
exports.deleteTutorial=deleteOne(Tutorial);
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
  exports.softDeleteTutorial=catchAsync( async (req, res, next) => {    
    const doc = await Tutorial.findByIdAndUpdate(req.params.id,{status:'inactive'});
  
    if (!doc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
    }
    res.status(204).json({
      status: "sucess",
      data: null,
    });
  })  
//exports.softDeleteModel=softDeleteOne(Model);
// exports.getAllTutorials=getAll(Tutorial);
exports.getAllTutorials = catchAsync( async (req, res, next) => {  
  let result = [];
  if(req.query.name){

    result = await Tutorial.aggregate(
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
  result = await Tutorial.aggregate(
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