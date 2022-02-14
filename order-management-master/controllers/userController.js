const User = require('./../models/createUser.model');
const Attendance = require('./../models/createAttendance.model');
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


exports.user = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("user/user", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.addUser = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("user/addUser", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.createUser = function (req, res) {

    var createUser = new User();
    createUser.joiningDate = req.body.joiningDate;
    createUser.name = req.body.name;
    createUser.email = req.body.email;
    createUser.password = req.body.email;
    createUser.FHName = req.body.FHName;
    createUser.dob = req.body.dob;
    createUser.contactNo = req.body.contactNo;
    createUser.whatsappContactNo = req.body.whatsappContactNo;
    createUser.localAddress = req.body.localAddress;
    createUser.permanentAddress = req.body.permanentAddress;
    createUser.designation = req.body.designation;
    createUser.workStatus = req.body.workStatus;
    createUser.salary = req.body.salary;
    createUser.pl = req.body.pl;
    createUser.bloodGroup = req.body.bloodGroup;
    createUser.adharNo = req.body.adharNo;
    createUser.votorNo = req.body.votorNo;
    createUser.panNo = req.body.panNo;
    createUser.drivingLicenseNo = req.body.drivingLicenseNo;
    createUser.pfNo = req.body.pfNo;
    createUser.esiInsuranceNo = req.body.esiInsuranceNo;
    createUser.esiUanNo = req.body.esiUanNo;
    createUser.esiMemberId = req.body.esiMemberId;
    createUser.bankName = req.body.bankName;
    createUser.bankAddress = req.body.bankAddress;
    createUser.bankAccountNo = req.body.bankAccountNo;
    createUser.bankIfscCode = req.body.bankIfscCode;
    createUser.reName1 = req.body.reName1;
    createUser.re1 = req.body.re1;
    createUser.reMobile1 = req.body.reMobile1;
    createUser.reName2 = req.body.reName2;
    createUser.re2 = req.body.re2;
    createUser.reMobile2 = req.body.reMobile2;
    createUser.save((err, doc) => {
        if (!err)
            res.redirect("/user");
        else {

            console.log(err);
        }
    });
}

exports.allUser = function (req, res){

    User.find({}, function (err, allUser){
            if(err) {
                console.log(err);
            }else{
                res.json({msg:'success',user:allUser});
            }
    });
}

exports.fetchMarketingPersonName = function (req, res) {    
    User.findOne({ _id:req.params.id}, function (err, userData){
            if(err) {
                console.log(err);
            }else{    
                console.log(userData);
                res.json({msg:'success', user: userData});
            }
    });
}

exports.updateUser = function (req, res) {

  if (req.params.id) {

    var Id = mongoose.Types.ObjectId(req.params.id);  
  } else {

    var Id = mongoose.Types.ObjectId(req.body.userId);  
  }

  console.log(req.body);

    User.findOneAndUpdate({ _id: Id}, { $set: req.body}, function(err, update){
        if(err) {
            console.log(err);
        }else{

            res.json({msg:'success'});
        }
    });
}


// -*-*-*-*-*-*-*-*-*-*-*-*Attendance*-*-*-*-*-*-*-*-*-*-*-*-
exports.completeAttendance = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("user/completeAttendance", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.createCompleteAttendance = function (req, res){

    console.log(req.body);

      for (var i = 0; i <= req.body.totalUser; i++) {
        
        let createAttendance = new Attendance();
          createAttendance.date = req.body.date;
          createAttendance.userId = req.session.userId;
          createAttendance.empId = req.body.empId[i];
          createAttendance.attendance = req.body.attendance[i];
          createAttendance.inTime = req.body.inTime[i];
          createAttendance.outTime = req.body.outTime[i];
          createAttendance.remark = req.body.remark[i];

          createAttendance.save((err, doc) => { 

          })
      
    };
      res.redirect('/complete-attendance');
}

exports.todayAttendance = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("user/todayAttendance", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.createAttendance = function (req, res){

    console.log(req.body);

      for (var i = 0; i <= req.body.totalUser; i++) {
        
        let createAttendance = new Attendance();
          createAttendance.date = today;
          createAttendance.userId = req.session.userId;
          createAttendance.empId = req.body.empId[i];
          createAttendance.attendance = req.body.attendance[i];
          createAttendance.inTime = req.body.inTime[i];
          createAttendance.remark = req.body.remark[i];

          createAttendance.save((err, doc) => { 

          })
      
    };
      res.redirect('/fabricate-item');
}

exports.addOutTimeAttendance = function (req, res) {

    if (req.session.userData) {

        username = req.session.userData;
        res.render("user/addOutTimeAttendance", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.allUserPreviousAttendance = function (req, res) {

  Attendance.aggregate([

    {
      $match : { date: yesterday}
    },

    {
      $lookup:
          {
              from: "users",
              localField: "empId",
              foreignField: "_id",
              as: "user"
          }
    },

  ]).then(function(allUser) {

    if(allUser) {
        console.log(allUser);
        res.json({msg:'success',user:allUser});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.updateOutTimeAttendance = function (req, res){

      for (var i = 0; i <= req.body.totalUser; i++) {
        
        Attendance.findOneAndUpdate({ _id:req.body.attendanceId[i]}, { $set: {outTime: req.body.outTime[i], remark: req.body.remark[i] }}, function(err, update){
          if(err) {
              console.log(err);
          }else{

          }
      });
      


      res.redirect('/add-out-time-attendance');
    };
}

exports.seeAttendance = function (req, res) {

    if (req.session.userData) {

        username = req.session.userData;
        res.render("user/seeAttendance", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.searchDateAttendance = function (req, res) {

  Attendance.aggregate([

    {
      $match : { date: req.body.firstDate}
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
              localField: "userId",
              foreignField: "_id",
              as: "user"
          }
    },

  ]).then(function(allUser) {

    if(allUser) {
        console.log(allUser);
        res.json({msg:'success',user:allUser});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

//User Role

exports.userRole = function (req, res) {    

    User.findOne({ _id:req.params.id}, function (err, userData){
            if(err) {
                console.log(err);
            }else{    
                
                username = req.session.userData;
                res.render("user/userRole", { userData:userData , username: username});
            }
    });
}
