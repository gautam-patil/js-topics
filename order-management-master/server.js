require('./models/db');

const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const router = require('./routes/api');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var cors = require('cors');  
const upload = require('express-fileupload');
const multer = require('multer');


var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.use(express.static(__dirname + '/public'));
app.use(cors());

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(upload());

//Session 
app.use(session({
	secret: 'yp',
	resave: true,
	saveUninitialized: true
}));

//Route File
// View Engine Setup 
app.set("views",path.join(__dirname,"views")) 
app.set("view engine","ejs") 
    
// var upload = multer({ dest: "Upload_folder_name" }) 
// If you do not want to use diskStorage then uncomment it 
    
// var storage = multer.diskStorage({ 
//     destination: function (req, file, cb) { 
  
//         // Uploads is the Upload_folder_name 
//         cb(null, "views/uploads") 
//     }, 
//     filename: function (req, file, cb) { 
//       cb(null, file.fieldname + "-" + Date.now()+".jpg") 
//     } 
//   }) 
       
// // Define the maximum size for uploading 
// // picture i.e. 1 MB. it is optional 
// const maxSize = 1 * 1000 * 1000; 
    
// var upload = multer({  
//     storage: storage, 
//     limits: { fileSize: maxSize }, 
//     fileFilter: function (req, file, cb){ 
    
//         // Set the filetypes, it is optional 
//         var filetypes = /jpeg|jpg|png/; 
//         var mimetype = filetypes.test(file.mimetype); 
  
//         var extname = filetypes.test(path.extname( 
//                     file.originalname).toLowerCase()); 
        
//         if (mimetype && extname) { 
//             return cb(null, true); 
//         } 
      
//         cb("Error: File upload only supports the "
//                 + "following filetypes - " + filetypes); 
//       }  
  
// // mypic is the name of file attribute 
// }).single("mypic");        
    
// app.post("/test-upload",function (req, res, next) { 
        
//     // Error MiddleWare for multer file upload, so if any 
//     // error occurs, the image would not be uploaded! 
//     upload(req,res,function(err) { 
  
//         if(err) { 
  
//             // ERROR occured (here it can be occured due 
//             // to uploading image of size greater than 
//             // 1MB or uploading different file type) 
//             res.send(err) 
//         } 
//         else { 
  
//             // SUCCESS, image successfully uploaded 
//             res.send("Success, Image uploaded!") 
//         } 
//     }) 
// })

app.use('/', router);

app.listen(3000, () => {
	console.log('Server Started at port: 3000');
});