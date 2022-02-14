const {getAll,getOne,createOne,updateOne,deleteOne,softDeleteOne}=require("../services/index").crudService;
const {Hairstyles,Package,Document, Color,Model, Photo}=require("../models");
const mergeImages=require("merge-images-v2");
const fs = require("fs");
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile)
const Caman = require('caman').Caman;
const Canvas = require('canvas');
const catchAsync = require('../utils/catchAsync');
const Jimp=require("jimp")
exports.getHairstyle=getOne(Hairstyles);
exports.getAllHairstylesAdmin=getAll(Hairstyles);
exports.getAllHairstyles = catchAsync( async (req, res, next) => {
  console.log("request params",req.params.id,req.params.start)
  let result = [];
//     result = await Hairstyles.aggregate(
//     [     
//       {
//         '$skip': Number(req.params.start)
//       }, {
//         '$limit': Number(req.params.end) - Number(req.params.start)
//       },
//  {
//     '$match': {
//       'status': 'active',      
//     }
//     }     
//     ]  
//   ).exec(); 
  if(req.query.name){

  result = await Hairstyles.aggregate(
    [
      {
    '$match': {
      'status': 'active',   
      'name' : {$regex: req.query.name}
    }
    },
      {
        '$skip': Number(req.params.start)
      }, {
        '$limit': Number(req.params.end) - Number(req.params.start)
      }
    ]  
  ).exec(); 
  }else{
  result = await Hairstyles.aggregate(
    [
      {
    '$match': {
      'status': 'active'
    }
    },
      {
        '$skip': Number(req.params.start)
      }, {
        '$limit': Number(req.params.end) - Number(req.params.start)
      }
    ]  
  ).exec(); 
  }
  
 
  let count = await Hairstyles.collection.count()  
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
  }    
  res.status(200).json({
    status: "sucess",
    data: {result,count},
  });
})

exports.softDeleteHairstyle=catchAsync( async (req, res, next) => {
      console.log(req.params.id)
      const doc = await Hairstyles.findByIdAndUpdate(req.params.id,{status:'inactive'});
      console.log(doc._id)
      if (!doc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
      }
      await Promise.all(doc.packages.map(async(pkg)=>{
        await Package.findByIdAndUpdate(pkg,{$pull:{hairstyles:doc.id}})
    }))
      res.status(204).json({
        status: "sucess",
        data: null,
      });
  })
exports.createHairstyle=catchAsync( async (req, res, next) => {
  try{
    //const hairstyle=await Hairstyles.findById(req.params.id);
    const addRes={}
    const buffer = Buffer.from(`${req.body.picture}`, "base64");
    await writeFile("new-path-colored.png", buffer,{flag:'w'});    
    if(req.query.flip){
      const image = await Jimp.read(`new-path-colored.png`)
      await image.flip(true, false).write('new-path-colored.png');
      addRes.flip=true;
    }else{
      addRes.flip=false;
    }
    let recentImg;
    //let buff = await Jimp.read(__basedir+"/assets/images/Model.png");
    let buff = fs.readFileSync(`${__basedir}/assets/images/Model.png`);
    recentImg = `data:image/png;base64,${buff.toString('base64')}`;

    addRes.default=true;    
  
    let mergeArr= [{
      src: recentImg, 
      // x: 0,
      // y: 0,
      width: 640,
      height: 646,
    }]
    
      addRes.background=false    
  //  console.log(image.flip(true, false));
      let mergeImage=await mergeImages([
        ...mergeArr,
        {
          src: "./new-path-colored.png",          
          x: req.query.flip?-8:0,
          // y: 20,
          width: 640,
          height: 646,
          // opacity: 0.2,
        },
      ],{
        Canvas: Canvas
      })
    req.body.mergedPicture = mergeImage
    let doc = await Hairstyles.create({ ...req.body, createdOn: Date.now() });
    console.log("Document")    

      //let Mergedres= await Hairstyles.findByIdAndUpdate(doc,{$addToSet:{mergedPicture:mergeImage}})            
      console.log("success")
     // console.log("mergeImage",mergeImage);
      await Promise.all(doc.packages.map(async(pkg)=>{
        let res=  await Package.findByIdAndUpdate(pkg,{$addToSet:{hairstyles:doc.id}})
        //console.log(res.hairstyles);
      }))

    
      res.status(201).json({
        status: "sucesss",
        data: {
          data: doc,
        },
      });      
      
    // console.log(arr);
    // res.status(200).json({
    //   status:"success",
    //   data:{mergeImage,...addRes,...hairstyle._doc},
    // })
  }catch(err){
    console.log(err);
   res.status(500).json({
     status:"failed",
     err:err
   })
  }    

  });
  
exports.updateHairstyle=catchAsync( async (req, res, next) => {
    const addRes={}
    if(req.body.picture){
      const buffer = Buffer.from(`${req.body.picture}`, "base64");
      await writeFile("new-path-colored.png", buffer,{flag:'w'});
      if(req.query.flip){
        const image = await Jimp.read(`new-path-colored.png`)
        await image.flip(true, false).write('new-path-colored.png');
        addRes.flip=true;
      }else{
        addRes.flip=false;
      }
      let recentImg;
      //let buff = await Jimp.read(__basedir+"/assets/images/Model.png");
      let buff = fs.readFileSync(`${__basedir}/assets/images/Model.png`);
      recentImg = `data:image/png;base64,${buff.toString('base64')}`;
  
      addRes.default=true;    
    
      let mergeArr= [{
        src: recentImg, 
        // x: 0,
        // y: 0,
        width: 640,
        height: 646,
      }]
      
        addRes.background=false    
    //  console.log(image.flip(true, false));
    console.log("demo video1")
        let mergeImage=await mergeImages([
          ...mergeArr,
          {
            src: "./new-path-colored.png",
    
            
            x: req.query.flip?-8:0,
            // y: 20,
            width: 640,
            height: 646,
            // opacity: 0.2,
          },
        ],{
          Canvas: Canvas
        })
        console.log("demo video")
      req.body.mergedPicture = mergeImage 
    }
      const doc = await Hairstyles.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
      }
  

      await Promise.all(doc.packages.map(async(pkg)=>{
        await Package.findByIdAndUpdate(pkg,{$addToSet:{hairstyles:doc.id}})
    }))
  
     
      res.status(200).json({
        status: "sucess",
        data: {
          data: doc,
        },
      });
  });

  exports.getHairstyleWithPicture=//catchAsync(
    async(req,res,next)=>{
      try{
        console.log(req.params.id)
    const hairstyle=await Hairstyles.findById(req.params.id);
    //console.log(hairstyle)
    const addRes={}
    const buffer = Buffer.from(`${hairstyle.picture}`, "base64");
   await writeFile("new-path-colored.png", buffer,{flag:'w'});
    if(req.query.flip){
    const image = await Jimp.read(`new-path-colored.png`)
   await image.flip(true, false).write('new-path-colored.png');
   addRes.flip=true;
    }else{
      addRes.flip=false;
    }
    let recentImg;
    if(!req.query.default){
    if(req.query.model){
      let recent=await Model.findById(req.params.recent);
      recentImg=`data:image/png;base64,${recent.picture}`
      addRes.model=req.params.recent;
      console.log("MODEL");
    }else{
    recentImg=(await Document.findById(req.params.recent)).picture;
    addRes.recent=req.params.recent;
    }
    console.log("Not in color");
  }else{
    let buff = fs.readFileSync(`${__dirname}/Model.png`);
    recentImg = `data:image/png;base64,${buff.toString('base64')}`;

    addRes.default=true;
  }
    // console.log(recent.picture);
    // console.log(hairstyles);
    let mergeArr= [{
      src: recentImg, 
      // x: 0,
      // y: 0,
      width: 640,
      height: 646,
    }]
    if(req.query.background){
      let bg=(await Photo.find({title:"background"}))[0]
      if(bg){
      
      mergeArr.push({
        src:`data:image/png;base64,${bg.picture}`,
        width: 640,
        height: 646,
      })
    }
    }else{
      addRes.background=false
    }
  //  console.log(image.flip(true, false));
      let mergeImage=await mergeImages([
        ...mergeArr,
        {
          src: "./new-path-colored.png",
  
          
          x: req.query.flip?-8:0,
          // y: 20,
          width: 640,
          height: 646,
          // opacity: 0.2,
        },
      ],{
        Canvas: Canvas
      })
      console.log("mergeImage");
      
    // console.log(arr);
    res.status(200).json({
      status:"success",
      data:{mergeImage,...addRes,...hairstyle._doc},
    })
  }catch(err){
    console.log(err);
   res.status(500).json({
     status:"failed",
     err:err
   })
  }
  }
  // ) 

 
  exports.getHairstyleWithPictureAndColor=//catchAsync(
    async(req,res,next)=>{
      try{
        const addRes={}
    //console.log(req.params)        
    const hairstyle=await Hairstyles.findById(req.params.id)
    //console.log(hairstyle)
    const buffer = Buffer.from(`${hairstyle.greyScale}`, "base64");
   await writeFile("new-path.png", buffer,{flag:'w'});
    if(req.query.flip){
    const image = await Jimp.read(`new-path.png`)
   await image.flip(true, false).write('new-path.png');
   addRes.flip=true
    }else{
      addRes.flip=false
    }
    let recentImg;
    if(!req.query.default){
    if(req.query.model){
      let recent=await Model.findById(req.params.recent);
      recentImg=`data:image/png;base64,${recent.picture}`
      console.log("MODEL");
      addRes.model=req.params.recent;
    }else{
    recentImg=(await Document.findById(req.params.recent)).picture;
    addRes.recent=req.params.recent;
    }
  }else{
    let buff = fs.readFileSync(`${__dirname}/Model.png`);
    recentImg = `data:image/png;base64,${buff.toString('base64')}`;
    addRes.default=true;
  }
    const {red,green,blue,strength}=await Color.findById(req.params.color);
    //console.log("hairstyles",red,green,blue,strength); 
    addRes.color=req.params.color
  //   const buffer = Buffer.from(`${hairstyle.greyScale}`, "base64");
  //   console.log(buffer);
  //  await writeFile("new-path.jpg", buffer,{flag:'w'});
  //  console.log("Done writing");
   let mergeArr= [{
    src: recentImg, 
    // x:0,
    // y: 0,
    width: 640,
    height: 646,
  }]
  if(req.query.background){
    let bg=(await Photo.find({title:"background"}))[0]
    if(bg){
    addRes.background=true
    mergeArr.push({
      src:`data:image/png;base64,${bg.picture}`,
      width: 640,
      height: 646,
    })
  }
  }else{
    addRes.background=false
  }
    Caman("./new-path.png",function(err) {
      // if(err){
      //   console.log("ERRR",err);
      // }
      // console.log(red,blue,green,strength); 
      this.colorize(red,green,blue,strength); 
      this.render(async function () {
        var image = this.toBase64();       
          let mergeImage=await mergeImages([
           ...mergeArr,
            {
              src: image,
              x: req.query.flip?-8:0,
              // y: 20,
              width: 640,
              height: 646,
              // opacity: 0.2,
            },
          ],{
            Canvas: Canvas
          })

   
          
          res.status(200).json({
            status:"success",
            data:{...hairstyle._doc,...addRes,mergeImage}
          })
        })
  })
 }catch(err){
   console.log(err);
   res.status(500).json({
     status:"failed",
     err:err
   })
 }
}
 //)

  

exports.deleteHairstyle=catchAsync( async (req, res, next) => {
     
      const doc = await Hairstyles.findByIdAndDelete(req.params.id);
  
      if (!doc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
      }
      await Promise.all(doc.packages.map(async(pkg)=>{
        await Package.findByIdAndUpdate(pkg,{$pull:{hairstyles:doc.id}})
    }))
      res.status(204).json({
        status: "sucess",
        data: null,
      });
    
  });
