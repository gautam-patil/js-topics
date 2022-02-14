const multer = require("multer");
const ApiError=require("../utils/ApiError");
const catchAsync=require("../utils/catchAsync")
const multerStorage = multer.memoryStorage();
const pdf2base64=require("pdf-to-base64")
const multerFilter = (req, file, cb) => {
   
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }

 
  else {
        cb(new ApiError("Not an image .Please upload only images!!", 404), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.uploadPics=(field) => upload.single(field);
exports.uploadMultiple=upload.fields([{
    name: "picture",
    maxCount: 1
},
{
    name: "greyScale",
    maxCount: 1
}
]);
exports.saveWithGreyScale=catchAsync(async(req, res, next) => {
    if (!req.files) return next();
    if (req.files.greyScale) {
        console.log(req.files.greyScale);
        req.body.greyScale = req.files.greyScale[0].buffer.toString("base64")
    }
    if (req.files.picture) {
        req.body.picture = req.files.picture[0].buffer.toString("base64")
    }
    next();
});
exports.savePics = catchAsync(async(req, res, next) => {
    if (!req.file) return next(); 

    if (req.file) {
        req.body.picture =  
        req.file.buffer.toString("base64")
       
    }
    next();
});
exports.saveGreyScale = catchAsync(async(req, res, next) => {
    if (!req.file) return next(); 

    if (req.file) {
        req.body.greyScale =  
        req.file.buffer.toString("base64")
       
    }
    next();
});
exports.saveProfile = catchAsync(async(req, res, next) => {
    if (!req.file) return next();
    if (req.file) {
        req.body.profile = 
        req.file.buffer.toString("base64")
       
    }
    next();
});
exports.saveIcon = catchAsync(async(req, res, next) => {
    if (!req.file) return next();
    
    if (req.file) {
        req.body.icon = 
        req.file.buffer.toString("base64")
       
    }
    next();
});
