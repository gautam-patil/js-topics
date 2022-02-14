const User = require('./../models/createUser.model');
const Enquiry = require('./../models/createEnquiry.model');
const Courier = require('./../models/createCourier.model');
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


exports.requestCourier = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("courier/requestCourier", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.requestCourierPage = function (req, res) {

  Enquiry.find({ _id: req.params.id }, function (err, allEnquiry) {
    if (err) {
      console.log(err);
    } else {
      username = req.session.userData;
      res.render("courier/requestCourierPage", { enquiry: allEnquiry, username: username})
    }
  });
};

exports.createCourier = function (req, res) {
  
    var createCourier = new Courier();
    createCourier.requestDate = today;
    createCourier.partyId = req.body.salePartyId;
    createCourier.requestUserId = req.session.userId;
    createCourier.itemDetail = req.body.itemDetail;
    createCourier.requestComment = req.body.comment;
    createCourier.role = 1;
    createCourier.save((err, doc) => {
        if (!err){

            username = req.session.userData;
            res.render("courier/requestCourier", {username: username});
        }
        else {

            console.log(err);
        }
    });
}

exports.requestedCourier = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("courier/requestedCourier", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.allRequestedCourier = function (req, res) {

  Courier.aggregate([

    {
      $match : { role: 1}
    },

    {
      $lookup:
          {
              from: "users",
              localField: "requestUserId",
              foreignField: "_id",
              as: "user"
          }
    },
    {
      $lookup:
          {
              from: "enquiries",
              localField: "partyId",
              foreignField: "_id",
              as: "saleParty"
          }
    },

  ]).then(function(allRequestedCourier) {

    if(allRequestedCourier) {

        res.json({msg:'success',requestedCourier:allRequestedCourier});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.confirmCourier = function (req, res) {

  if (req.session.userData) {
        
        req.body.confirmUserId = req.session.userId;
        req.body.confirmDate = today;
        req.body.role = 2;

        var Id = mongoose.Types.ObjectId(req.body.courierId);  

        Courier.findOneAndUpdate({ _id:Id}, { $set: req.body}, function(err, update){
            if(err) {
                console.log(err);
            }else{

                res.json({msg:'success'});
            }
        });
  }else{
      res.redirect("/");
  }
}

exports.sendCourier = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("courier/sendCourier", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.allSendCourier = function (req, res) {

  Courier.aggregate([

    {
      $match : { role: 2}
    },

    {
      $lookup:
          {
              from: "users",
              localField: "requestUserId",
              foreignField: "_id",
              as: "user"
          }
    },
    {
      $lookup:
          {
              from: "users",
              localField: "confirmUserId",
              foreignField: "_id",
              as: "confirmUser"
          }
    },
    {
      $lookup:
          {
              from: "enquiries",
              localField: "partyId",
              foreignField: "_id",
              as: "saleParty"
          }
    },

  ]).then(function(allSendCourier) {

    if(allSendCourier) {
      console.log(allSendCourier);
        res.json({msg:'success',sendCourier:allSendCourier});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.createSendCourier = function (req, res) {

  if (req.session.userData) {

      req.body.sendUserId = req.session.userId;
      req.body.sendDate = today;
      req.body.role = 3;

      var Id = mongoose.Types.ObjectId(req.body.courierId);  

      Courier.findOneAndUpdate({ _id:Id}, { $set: req.body}, function(err, update){
          if(err) {
              console.log(err);
          }else{

              res.json({msg:'success'});
          }
      });
  }else{
      res.redirect("/");
  }
}

exports.recieveCourier = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("courier/recieveCourier", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.allRecieveCourier = function (req, res) {

  Courier.aggregate([

    {
      $match : { role: 3}
    },

    {
      $lookup:
          {
              from: "users",
              localField: "requestUserId",
              foreignField: "_id",
              as: "user"
          }
    },
    {
      $lookup:
          {
              from: "users",
              localField: "confirmUserId",
              foreignField: "_id",
              as: "confirmUser"
          }
    },
    {
      $lookup:
          {
              from: "users",
              localField: "sendUserId",
              foreignField: "_id",
              as: "sendUser"
          }
    },
    {
      $lookup:
          {
              from: "enquiries",
              localField: "partyId",
              foreignField: "_id",
              as: "saleParty"
          }
    },

  ]).then(function(allRecieveCourier) {

    if(allRecieveCourier) {
      console.log(allRecieveCourier);
        res.json({msg:'success',recieveCourier:allRecieveCourier});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.createRecieveCourier = function (req, res) {

  if (req.session.userData) {

      req.body.recieveUserId = req.session.userId;
      req.body.recieveDate = today;
      req.body.role = 4;

      var Id = mongoose.Types.ObjectId(req.body.courierId);  

      Courier.findOneAndUpdate({ _id:Id}, { $set: req.body}, function(err, update){
          if(err) {
              console.log(err);
          }else{

              res.json({msg:'success'});
          }
      });
  }else{
      res.redirect("/");
  }
}

exports.viewCourier = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("courier/viewCourier", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.searchCourier = function (req, res) {

    userData = req.session.userData;
    id = req.session.userId;

    var searchTermArray = [];
    var condition = [];
    var searchTerm = req.body.searchTerm;
    var requestDate = req.body.requestDate;
    var confirmDate = req.body.confirmDate;
    var sendDate = req.body.sendDate;
    var recieveDate = req.body.recieveDate;
    var requestUser = req.body.requestUser;
    var courierName = req.body.courierName;
    var docNo = req.body.docNo;

    console.log(req.body)


    if (searchTerm) {

        Int = parseInt(searchTerm);

        searchTermArray.push({"saleParty.shopName": {$regex: searchTerm}});
        searchTermArray.push({"saleParty.mobile": Int});
        condition = [{$or : searchTermArray}];
    }

    if (userData.seeMktEnquiryRole == 1) {

        var userId = mongoose.Types.ObjectId(id);
        condition.push({requestUserId: userId});
    }

    if (requestDate) {

      console.log(requestDate);

        condition.push({requestDate: requestDate});
    }
    if (confirmDate) {

        condition.push({confirmDate: confirmDate});
    }
    if (sendDate) {

        condition.push({sendDate: sendDate});
    }
    if (recieveDate) {

        condition.push({recieveDate: recieveDate});
    }
    if (requestUser) {

        var requestUserId = mongoose.Types.ObjectId(requestUser);
        condition.push({requestUserId: requestUserId});
    }

    if (courierName) {

        condition.push({courierName: courierName});
    }

    if (docNo) {

        condition.push({docNo: recieveDate});
    }

    console.log(condition);


    Courier.aggregate(
        [
        
        {
          $lookup:
              {
                  from: "users",
                  localField: "requestUserId",
                  foreignField: "_id",
                  as: "user"
              }
        },
        {
          $lookup:
              {
                  from: "users",
                  localField: "confirmUserId",
                  foreignField: "_id",
                  as: "confirmUser"
              }
        },
        {
          $lookup:
              {
                  from: "users",
                  localField: "sendUserId",
                  foreignField: "_id",
                  as: "sendUser"
              }
        },
        {
          $lookup:
              {
                  from: "enquiries",
                  localField: "partyId",
                  foreignField: "_id",
                  as: "saleParty"
              }
        },
        {$match : { $and: condition }},
        {
            $sort : { 'requestDate' : 1}
        },        
            

                ]).then(function(allCourier) {
        
            if(allCourier) {
                res.json({msg:'success',courier:allCourier});
            }else{
                res.json({msg:'success',enquiry: []});
            }
    });
}

exports.viewCourierDetail = function (req, res) {    

    var Id = mongoose.Types.ObjectId(req.params.id);

    Courier.aggregate([

                {
                    $match : { _id:  Id}
                },
                {
                  $lookup:
                      {
                          from: "users",
                          localField: "requestUserId",
                          foreignField: "_id",
                          as: "user"
                      }
                },
                {
                  $lookup:
                      {
                          from: "users",
                          localField: "confirmUserId",
                          foreignField: "_id",
                          as: "confirmUser"
                      }
                },
                {
                  $lookup:
                      {
                          from: "users",
                          localField: "sendUserId",
                          foreignField: "_id",
                          as: "sendUser"
                      }
                },
                {
                  $lookup:
                      {
                          from: "users",
                          localField: "recieveUserId",
                          foreignField: "_id",
                          as: "recieveUser"
                      }
                },
                {
                  $lookup:
                      {
                          from: "enquiries",
                          localField: "partyId",
                          foreignField: "_id",
                          as: "saleParty"
                      }
                },

                    ]).then(function(courierData) {
            
                if(courierData) {
                    
                    username = req.session.userData;
                    res.render("courier/viewCourierPage", { courier: courierData, username: username})
                }else{
                    res.json({msg:'success',enquiry: []});
                }
            });
}                  