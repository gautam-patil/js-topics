const {getAll,getOne,createOne,updateOne,deleteOne}=require("../services/index").crudService;
const {Color}=require("../models")
const Caman = require('caman').Caman;
const catchAsync = require('../utils/catchAsync');

// c = Caman("src/controllers/swatch.png");
// Caman.Event.listen(c,"processStart", function (job) {
//     console.log("Start:", job.name);
//   });

// Caman.Event.listen(c, "processComplete", function (job) {
//   console.log("Finished:", job.name);
// });
  
  // Listen to a single instance only
exports.createColor=catchAsync(async (req,res,next)=>{
    const {red,blue,green,strength,picture}=req.body    
     console.log(__basedir) 
     Caman(__basedir+"/assets/images/swatch.png",function(err) {
        this.colorize(red,green,blue,strength); 
        this.render(async function () {
          var picture = this.toBase64();       
            const color=await Color.create({red,blue,green,strength,picture})
            res.status(201).json({
                status:"success",
                data:color
            })
        }
        )
    })
});
exports.updateColor=catchAsync( async (req, res, next) => {    
    // const doc = await Color.findByIdAndUpdate(req.params.id, req.body);
    // if (!doc) {
    //   throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
    // }     
     Caman(__basedir+"/assets/images/swatch.png",function(err) {
        this.colorize(req.body.red,req.body.green,req.body.blue,req.body.strength); 
        this.render(async function () {
          req.body.picture = this.toBase64();                   
            const doc=await Color.findByIdAndUpdate(req.params.id, req.body);            
            if (!doc) {
                throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
            }     
            res.status(200).json({
                status:"success",
                data:doc
            })
         
        }
        )
    })     
//     await Promise.all(doc.packages.map(async(pkg)=>{
//       await Package.findByIdAndUpdate(pkg,{$addToSet:{hairstyles:doc.id}})
//   }))

   
});
//exports.updateColor=updateOne(Color);

exports.deleteColor=catchAsync( async (req, res, next) => {
     
    const doc = await Color.findByIdAndDelete(req.params.id);

    if (!doc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No document found at that id');
    }
    res.status(204).json({
      status: "sucess",
      data: null,
    });
  
});

exports.getColor=getOne(Color);
exports.deleteColor=deleteOne(Color);
exports.getAllColors=getAll(Color);