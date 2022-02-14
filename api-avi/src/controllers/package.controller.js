const {getAll,getOne,createOne,updateOne,deleteOne,softDeleteOne}=require("../services/index").crudService;
const {Package,Hairstyles}=require("../models");
const catchAsync=require("../utils/catchAsync")
const mongoose = require('mongoose');

// import {Types} from 'mongoose';


exports.createPackage=createOne(Package);
exports.updatePackage=updateOne(Package);
exports.getOnePackage=getOne(Package);
exports.getPackage=catchAsync( async (req, res, next) => {
  console.log("request params",req.params.id,req.params.start)
  let result = await Package.aggregate(
    [
      {
        '$match': {
          '_id': mongoose.Types.ObjectId(req.params.id)
        }
      }, {
        '$lookup': {
          'from': 'hairstyles', 
          'let': {
            'hairstyle_id': '$hairstyles'
          }, 
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$in': [
                    '$_id', '$$hairstyle_id'
                  ]
                }
              }
            }, {
              '$skip': req.params.start
            }, {
              '$limit': req.params.end- req.params.start
            }
          ], 
          'as': 'hairstyleData'
        }
      }, {
        '$project': {
          'mergedPictureIds': '$hairstyleData._id', 
          'mergedPicture': '$hairstyleData.mergedPicture'
        }
      }
    ]    
  ).exec();  
  let mergedImages = result[0]
//   console.log("request",req.params)  
//   let doc = await Package.findById(req.params.id);
//   let start = req.params.start;
//   let end =req.params.end;  
//   mergedImages = []
//   const hairstyleArray = doc.hairstyles.slice(start,end)
//   console.log("hairstyleArray",hairstyleArray)  
//   mergedImages = await Hairstyles.find({'_id':{$in:hairstyleArray}});    
//   console.log("mergedImages",mergedImages.length)  
//   //mergedImages = hairstyle
// //   for(var i = start; i < end;i++){    
// //     if(doc.hairstyles[i]!=undefined){
// //       const hairstyle = await Hairstyles.findById(doc.hairstyles[i]);    
// //       mergedImages.push(hairstyle)  
// //     }
// // }
  if (!mergedImages) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
  }  
  //console.log("doc",doc.mergedImages)
  res.status(200).json({
    status: "sucess",
    data: {mergedImages},
  });
})
//exports.getAllPackages=getAll(Package);

exports.getAllPackages = catchAsync( async (req, res, next) => {  
  let result = [];
  if(req.query.name){

    result = await Package.aggregate(
      [
        {
          '$match': {
            'status': 'active',   
            'title' : {$regex: req.query.name}
          }
        },
    ]  
  ).exec(); 
  }else{
  result = await Package.aggregate(
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
exports.softDeletePackage=catchAsync( async (req, res, next) => {
    
  const doc = await Package.findByIdAndUpdate(req.params.id,{status:'inactive'});

  if (!doc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
  }
  await Promise.all(doc.hairstyles.map(async(hairstyle)=>{
    await Hairstyles.findByIdAndUpdate(hairstyle,{$pull:{packages:doc.id}})
}))
  res.status(204).json({
    status: "sucess",
    data: null,
  });
})

exports.removeHairstyleFromPackage=catchAsync(async(req,res,next)=>{
    const doc=await Hairstyles.findByIdAndUpdate(req.params.hairstyleId,{$pull:{packages:req.params.pkgId}}, {
        new: true,
        runValidators: true,
      })

    const data=await Package.findByIdAndUpdate(req.params.pkgId,{$pull:{hairstyles:req.params.hairstyleId}})
    console.log(data);
    if (!doc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
      }
      res.status(200).json({
        status: "success",
        data: doc,
      });
})

exports.addHairstyleToPackage=catchAsync(async(req,res,next)=>{
    const doc=await Hairstyles.findByIdAndUpdate(req.params.hairstyleId,{$addToSet:{packages:req.params.pkgId}}, {
        new: true,
        runValidators: true,
      })
      const data=await Package.findByIdAndUpdate(req.params.pkgId,{$addToSet:{hairstyles:req.params.hairstyleId}})
      console.log(data);
    if (!doc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
      }
      res.status(200).json({
        status: "success",
        data: doc,
      });
})


exports.deletePackage=catchAsync( async (req, res, next) => {
    
  const doc = await Package.findByIdAndDelete(req.params.id);

  if (!doc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
  }
  await Promise.all(doc.hairstyles.map(async(hairstyle)=>{
    await Hairstyles.findByIdAndUpdate(hairstyle,{$pull:{packages:doc.id}})
}))
  res.status(204).json({
    status: "sucess",
    data: null,
  });
})