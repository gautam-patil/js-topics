const Task = require('./../models/createTask.model');
const User = require('./../models/createUser.model');
const TaskReview = require('./../models/createTaskReview.model');
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


exports.manager = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("team/manager", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.createTeams = function (req, res) {    

    User.findOne({ _id: req.body.empId}, function (err, user){

        if (!user.teamRole || user.teamRole == 0) {

            User.findOneAndUpdate({ _id:req.body.empId}, { $set: req.body}, function(err, update){
                if(err) {
                    console.log(err);
                }else{

                    res.json({msg:'success'});
                }
            });

        } else {

            res.json({msg:'fail'});
        }

            // if(!allUser){

            //     var createTeam = new Team();
            //     createTeam.empId = req.body.empId;
            //     createTeam.department = req.body.department;
            //     createTeam.goal = req.body.goal;
            //     createTeam.managerId = req.body.managerId;
            //     createTeam.teamId = req.body.teamId;
            //     createTeam.role = req.body.role;
            //     createTeam.save((err, doc) => {
            //         if (!err)
            //             res.json({msg:'success'});
            //         else {

            //             console.log(err);
            //         }
            //     });

            // }else{

            // }
    });
}

exports.createTask = function (req, res) {    


    var createTask = new Task();
    createTask.empId = req.body.empId;
    createTask.task = req.body.task;
    createTask.role = 1;
    createTask.save((err, doc) => {
        if (!err)
            res.json({msg:'success'});
        else {

            console.log(err);
        }
    });

}

exports.addTaskReview = function (req, res) {    

    username = req.session.userData;

    var createTaskReview = new TaskReview();
    createTaskReview.empId = username._id;
    createTaskReview.taskId = req.body.taskId;
    createTaskReview.selfReviewDate = req.body.selfReviewDate;
    createTaskReview.selfReview = req.body.selfReview;
    createTaskReview.selfReviewScore = req.body.selfReviewScore;
    createTaskReview.save((err, doc) => {
        if (!err)
            res.json({msg:'success'});
        else {

            console.log(err);
        }
    });

}


exports.updateTask = function (req, res) {

    Task.findOneAndUpdate({ _id:req.body.Id}, { $set: req.body}, function(err, update){
        if(err) {
            console.log(err);
        }else{

            res.json({msg:'success'});
        }
    });
}

exports.allManager = function (req, res) {

  User.aggregate([

    {
      $match : { teamRole: 1}
    },


  ]).then(function(allManager) {

    if(allManager) {
        res.json({msg:'success',manager:allManager});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.allManagerTeam = function (req, res) {

    var Id = mongoose.Types.ObjectId(req.params.id);

  User.aggregate([

    {
      $match : { $and: [{managerId: Id}, {teamRole: 2}]}
    },

  ]).then(function(allManagerTeam) {

    if(allManagerTeam) {
        res.json({msg:'success',team:allManagerTeam});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.allManagerMember = function (req, res) {

  var Id = mongoose.Types.ObjectId(req.params.id);

  User.aggregate([

    {
      $match : { $and: [{managerId: Id}, {teamRole: 3}]}
    },

  ]).then(function(allManagerMember) {

    if(allManagerMember) {
        res.json({msg:'success',member:allManagerMember});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.allTeamMember = function (req, res) {

  var Id = mongoose.Types.ObjectId(req.params.id);

  User.aggregate([

    {
      $match : { $and: [{teamId: Id}, {teamRole: 4}]}
    },



  ]).then(function(allTeamMember) {

    if(allTeamMember) {
        res.json({msg:'success',member:allTeamMember});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.viewManager = function (req, res) {    

    var Id = mongoose.Types.ObjectId(req.params.id);

    User.aggregate([

        {
          $match : { _id: Id}
        },

      ]).then(function(allManager) {

        if(allManager) {
            
            username = req.session.userData;
            res.render("team/viewManager", { manager: allManager, username: username})
        }else{
            res.json({msg:'success',purchaseStock: []});
        }
      })
}

exports.viewMember = function (req, res) {    

    var Id = mongoose.Types.ObjectId(req.params.id);

    User.aggregate([

        {
          $match : { _id: Id}
        },

      ]).then(function(allManager) {

        if(allManager) {
            
            username = req.session.userData;
            res.render("team/viewMember", { member: allManager, username: username})
        }else{
            res.json({msg:'success',purchaseStock: []});
        }
      })
}

exports.viewTeam = function (req, res) {    

    var Id = mongoose.Types.ObjectId(req.params.id);

    User.aggregate([

        {
          $match : { _id: Id}
        },

      ]).then(function(allTeam) {

        if(allTeam) {
            
            username = req.session.userData;
            res.render("team/viewTeam", { team: allTeam, username: username})
        }else{
            res.json({msg:'success',purchaseStock: []});
        }
      })
}

exports.allTask = function (req, res) {

  var Id = mongoose.Types.ObjectId(req.params.id);

  Task.aggregate([

    {
      $match : { empId: Id}
    },

  ]).then(function(allTask) {

    if(allTask) {
        res.json({msg:'success',task:allTask});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.myTodayTask = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("team/myTodayTask", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.allMyTodayTask = function (req, res) {

  username = req.session.userData;

  var Id = mongoose.Types.ObjectId(username._id);

  Task.aggregate([

    {
      $match : { $and: [{empId: Id}, {role: 0}]}
    },

  ]).then(function(allTask) {

    if(allTask) {
        res.json({msg:'success',task:allTask});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};