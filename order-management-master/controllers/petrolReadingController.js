const Colour = require('./../models/createColour.model');
const Size = require('./../models/createSize.model');
const PetrolReading = require('./../models/createPetrolReading.model');
var mongoose = require('mongoose');

var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 

var yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

var ydd = yesterday.getDate();
var ymm = yesterday.getMonth()+1; //January is 0!

var yyyyy = yesterday.getFullYear();

if(ydd<10){ydd='0'+ydd} if(ymm<10){ymm='0'+ymm} yesterday = yyyyy+'-'+ymm+'-'+ydd;

today = yyyy+'-'+mm+'-'+dd;




exports.startPetrolReading = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("petrolReading/startPetrolReading", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.createPetrolReading = function (req, res) {
  
    var createPetrolReading = new PetrolReading();
    createPetrolReading.date = today;
    createPetrolReading.empId = req.body.empId;
    createPetrolReading.startReading = req.body.startReading;
    createPetrolReading.startReadingUserId = req.session.userId;
    createPetrolReading.role = 1;
    createPetrolReading.save((err, doc) => {
        if (!err)
            res.json({msg:'success'});
        else {

            console.log(err);
        }
    });
}

exports.allStartPetrolReading = function (req, res) {

  PetrolReading.aggregate([

    {
      $match : { role: 1}
    },

    {
      $lookup:
          {
              from: "users",
              localField: "empId",
              foreignField: "_id",
              as: "emp"
          }
    },
    {
      $lookup:
          {
              from: "users",
              localField: "startReadingUserId",
              foreignField: "_id",
              as: "startUser"
          }
    },

  ]).then(function(allStartReading) {

    if(allStartReading) {
        res.json({msg:'success',startReading:allStartReading});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.lastPetrolReading = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("petrolReading/lastPetrolReading", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.updateLastPetrolReading = function (req, res) {

  req.body.lastReadingUserId = req.session.userId;
  req.body.role = 2;

  var Id = mongoose.Types.ObjectId(req.body.petrolReadingId);  

  PetrolReading.findOneAndUpdate({ _id:Id}, { $set: req.body}, function(err, update){
      if(err) {
          console.log(err);
      }else{

          res.json({msg:'success'});
      }
  });
}