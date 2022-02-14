const Enquiry = require('./../models/createEnquiry.model');
const Followup = require('./../models/createFollowup.model');
const User = require('./../models/createUser.model');
const Quotation = require('./../models/createQuotation.model');
var mongoose = require('mongoose');

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

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

today = yyyy+'-'+mm+'-'+dd;

exports.addEnquiry = function (req, res){

	if (req.session.userData) {

        username = req.session.userData;
        role = req.session.userRole;
        id = req.session.userId;

        res.render("enquiry/addEnquiry", {username: username, role:role, id:id});
    }else{
        res.redirect("/");
    }
}

exports.createEnquiry = function (req, res){

	var createNewEnquiry = new Enquiry();
    createNewEnquiry.enquiryDate = req.body.enquiryDate;
    createNewEnquiry.marketingPerson = req.body.marketingPerson;
    createNewEnquiry.refrenceBy = req.body.refrenceBy;
    createNewEnquiry.shopName = req.body.shopName;
    createNewEnquiry.enquiryStatus = req.body.enquiryStatus;
    createNewEnquiry.shopType = req.body.shopType;
    createNewEnquiry.category = req.body.category;
    createNewEnquiry.mobile = req.body.mobile;
    createNewEnquiry.email = req.body.email;
    createNewEnquiry.state = req.body.state;
    createNewEnquiry.city = req.body.city;
    createNewEnquiry.address = req.body.address;
    createNewEnquiry.firstContactPersonName = req.body.firstContactPersonName;
    createNewEnquiry.firstContactPersonMobile = req.body.firstContactPersonMobile;
    createNewEnquiry.secondContactPersonName = req.body.secondContactPersonName;
    createNewEnquiry.secondContactPersonMobile = req.body.secondContactPersonMobile;
    createNewEnquiry.requirement = req.body.requirement;
    createNewEnquiry.currentWorking = req.body.currentWorking;
    createNewEnquiry.transportName = req.body.transportName;
    createNewEnquiry.transportNumber = req.body.transportNumber;

    Enquiry.findOne( { $and: [ { mobile: createNewEnquiry.mobile }, { email: createNewEnquiry.email } ] }  , function (err, isEnquiryExist){
            if(err) {
                console.log(err);
            }
            if (isEnquiryExist) {

                res.json({msg:'fail'});
            }else{
                createNewEnquiry.save((err, doc) => {
                  res.json({msg:'success'});  
                });
            }

    })
}

exports.seeEnquiry = function (req, res){

    if (req.params.id) {

        if (req.session.userData.seeMktEnquiryRole  == 0) {
            
            var Id = mongoose.Types.ObjectId(req.params.id);    
            Enquiry.aggregate([

                {
                    $match : { _id: Id }
                },

                    ]).then(function(allEnquiry) {
            
                if(allEnquiry) {

                    res.json({msg:'success',enquiry:allEnquiry});
                }else{
                    res.json({msg:'success',enquiry: []});
                }
            });        
        }else{

            var userId = mongoose.Types.ObjectId(req.params.id);

            Enquiry.aggregate([

                {
                    $match : { marketingPerson: userId }
                },
                {
                    $lookup:
                        {
                            from: "users",
                            localField: "marketingPerson",
                            foreignField: "_id",
                            as: "marketingPersonName"
                        }
                },
                {
                    $lookup:
                        {
                            from: "followups",
                            localField: "_id",
                            foreignField: "enquiryId",
                            as: "followup"
                        }
                },

                    ]).then(function(allEnquiry) {
            
                if(allEnquiry) {

                    res.json({msg:'success',enquiry:allEnquiry});
                }else{
                    res.json({msg:'success',enquiry: []});
                }
            });

        }

        

    } else {

        var userId = mongoose.Types.ObjectId(req.session.userId);
        

        if (req.session.userData.seeMktEnquiryRole  == 0) {
        	Enquiry.aggregate([

        		{
        			$lookup:
        			    {
        			        from: "users",
        			        localField: "marketingPerson",
        			        foreignField: "_id",
        			        as: "marketingPersonName"
        			    }
        		},
                {
                    $lookup:
                        {
                            from: "followups",
                            localField: "_id",
                            foreignField: "enquiryId",
                            as: "followup"
                        }
                },
                {
                    $sort : { 'shopName': 1 }
                },

        			]).then(function(allEnquiry) {
        	
                if(allEnquiry) {
                    
                    res.json({msg:'success',enquiry:allEnquiry});
                }else{
                    res.json({msg:'success',enquiry: []});
                }
            });
        }else{
            Enquiry.aggregate([

                {
                    $match : { marketingPerson: userId }
                },
                {
                    $lookup:
                        {
                            from: "users",
                            localField: "marketingPerson",
                            foreignField: "_id",
                            as: "marketingPersonName"
                        }
                },
                {
                    $lookup:
                        {
                            from: "followups",
                            localField: "_id",
                            foreignField: "enquiryId",
                            as: "followup"
                        }
                },

                    ]).then(function(allEnquiry) {
            
                if(allEnquiry) {
                    
                    res.json({msg:'success',enquiry:allEnquiry});
                }else{
                    res.json({msg:'success',enquiry: []});
                }
            });
        }  

    }  
}

//See Dealer Enquiry
exports.seeDealerEnquiry = function (req, res){
    
    if (req.session.userData.seeMktEnquiryRole  == 0) {
        Enquiry.aggregate([
            {
                $match : { $or: [{enquiryStatus : "New Dealer"}, {enquiryStatus : "Confirm Dealer"}] }
            },
            {
                $lookup:
                    {
                        from: "users",
                        localField: "marketingPerson",
                        foreignField: "_id",
                        as: "marketingPersonName"
                    }
            },
            {
                $lookup:
                    {
                        from: "followups",
                        localField: "_id",
                        foreignField: "enquiryId",
                        as: "followup"
                    }
            },
            {
                $sort : { 'shopName': 1 }
            },

                ]).then(function(allEnquiry) {
        
            if(allEnquiry) {
                
                res.json({msg:'success',enquiry:allEnquiry});
            }else{
                res.json({msg:'success',enquiry: []});
            }
        });
    }else{
        Enquiry.aggregate([

            {
                $match : { $and: [{ marketingPerson: userId }, { $or: [{enquiryStatus : "New Dealer"}, {enquiryStatus : "Confirm Dealer"}] }] }
            },
            {
                $lookup:
                    {
                        from: "users",
                        localField: "marketingPerson",
                        foreignField: "_id",
                        as: "marketingPersonName"
                    }
            },
            {
                $lookup:
                    {
                        from: "followups",
                        localField: "_id",
                        foreignField: "enquiryId",
                        as: "followup"
                    }
            },

                ]).then(function(allEnquiry) {
        
            if(allEnquiry) {
                
                res.json({msg:'success',enquiry:allEnquiry});
            }else{
                res.json({msg:'success',enquiry: []});
            }
        });
    }  

}


//Test
exports.showEnquiry = function (req, res){

    if (req.session.userData) {

        username = req.session.userData;
        role = req.session.userData.role;
        id = req.session.userId;

        res.render("enquiry/showEnquiry", {username: username, role:role, id:id});
    }else{
        res.redirect("/");
    }
}

exports.showEnquiryFollowup = function (req, res){

    if (req.session.userData) {

        username = req.session.userData;
        role = req.session.userRole;
        id = req.session.userId;

        res.render("enquiry/showEnquiryFollowup", {username: username, role:role, id:id});
    }else{
        res.redirect("/");
    }
}

exports.updateFollowup = function (req, res){

    var date = new Date();
    let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

	var enquiryId = req.body.enquiryId;
    var followupDate = today;
    var comment = req.body.comment;
    var nextFollowupDate = req.body.nextFollowupDate;
    var followupTime = time;

    var createFollowup = new Followup();
    createFollowup.enquiryId = enquiryId;
    createFollowup.followupDate = followupDate;
    createFollowup.comment = comment;
    createFollowup.nextFollowupDate = nextFollowupDate;
    createFollowup.followupTime = followupTime;
    createFollowup.save((err, doc) => {
        if (!err){

            res.json({msg:'success' });
        }
        else {

            console.log(err);
        }
    });
}

exports.searchEnquiry = function (req, res) {

    userData = req.session.userData;
    id = req.session.userId;

    var searchTermArray = [];
    var condition = [];
    var searchTerm = req.body.searchTerm;
    var state = req.body.state;
    var city = req.body.city;
    var enquiryDate = req.body.enquiryDate;
    var enquiryStatus = req.body.enquiryStatus;
    var shopType = req.body.shopType;
    var category = req.body.category;
    var marketingPerson = req.body.marketingPerson;
    var followupDate = req.body.followupDate;
    var nextFollowupDate = req.body.nextFollowupDate;


    if (searchTerm) {

        Int = parseInt(searchTerm);

        searchTermArray.push({shopName: {$regex: searchTerm}});
        searchTermArray.push({mobile: Int});
        condition = [{$or : searchTermArray}];
    }

    if (userData.seeMktEnquiryRole == 1) {

        var userId = mongoose.Types.ObjectId(id);
        condition.push({marketingPerson: userId});
    }

    if (enquiryDate) {

        condition.push({enquiryDate: enquiryDate});
    }
    if (state) {

        condition.push({state: {$regex: state}});
    }
    if (city) {

        condition.push({city: {$regex: city}});
    }
    if (enquiryStatus) {

        condition.push({enquiryStatus: enquiryStatus});
    }
    if (shopType) {

        condition.push({shopType: shopType});
    }
    if (category) {

        condition.push({category: category});
    }
    if (marketingPerson) {

        var marketingPersonId = mongoose.Types.ObjectId(marketingPerson);
        condition.push({marketingPerson: marketingPersonId});
    }
    if (followupDate) {

        condition.push({"followup.followupDate": followupDate});
    } 
    if (nextFollowupDate) {

        condition.push({"followup.nextFollowupDate": nextFollowupDate});
    } 

    console.log(condition);


    Enquiry.aggregate(
        [

      {
            $lookup:
                {
                    from: "followups",
                    localField: "_id",
                    foreignField: "enquiryId",
                    as: "followup"
                }
        },
        {$match : { $and: condition }},
        {
            $lookup:
                {
                    from: "users",
                    localField: "marketingPerson",
                    foreignField: "_id",
                    as: "marketingPersonName"
                }
        },
        {
            $sort : { 'shopName' : 1,'followups.followupDate' : -1}
        },        
            

                ]).then(function(searchEnquiry) {
        
            if(searchEnquiry) {
                res.json({msg:'success',enquiry:searchEnquiry});
            }else{
                res.json({msg:'success',enquiry: []});
            }
    });
}

// Edit Enquiry
exports.editEnquiryPage = function (req, res) {    
    Enquiry.findOne({ _id:req.params.id}, function (err, enquiryData){
            if(err) {
                console.log(err);
            }else{    
                username = req.session.userData;
                res.render("enquiry/editEnquiry", { enquiry: enquiryData, username: username})
            }
    });
}

// View Enquiry
exports.viewEnquiryPage = function (req, res) {    

    var Id = mongoose.Types.ObjectId(req.params.id);

    Enquiry.aggregate([

                {
                    $match : { _id:  Id}
                },
                {
                    $lookup:
                        {
                            from: "users",
                            localField: "marketingPerson",
                            foreignField: "_id",
                            as: "marketingPersonName"
                        }
                },
                {
                    $lookup:
                        {
                            from: "followups",
                            localField: "_id",
                            foreignField: "enquiryId",
                            as: "followups"
                        }
                },

                    ]).then(function(enquiryData) {
            
                if(enquiryData) {
                    
                    username = req.session.userData;
                    res.render("enquiry/viewEnquiry", { enquiry: enquiryData, username: username})
                }else{
                    res.json({msg:'success',enquiry: []});
                }
            });

    // Enquiry.findOne({ _id:req.params.id}, function (err, enquiryData){
    //         if(err) {
    //             console.log(err);
    //         }else{
    //             username = req.session.userData;
    //             res.render("enquiry/viewEnquiry", { enquiry: enquiryData, username: username})
    //         }
    // });
}

// Update Enquiry
exports.updateEnquiry = function (req, res) {

    if (req.params.id) {

        Enquiry.findOneAndUpdate({ _id:req.params.id}, { $set: req.body}, function(err, update){
            if(err) {
                console.log(err);
            }else{

                res.json({msg:'success'});
            }
        });
    } else {

        console.log(req.body);

        Enquiry.findOneAndUpdate({ _id:req.body.enquiryId}, { $set: req.body}, function(err, update){
            if(err) {
                console.log(err);
            }else{

                res.json({msg:'success'});
            }
        });
    }

}

exports.updateEnquiryOpening = function (req, res) {

        req.body.softDate = today;
        var Id = mongoose.Types.ObjectId(req.params.id);

        console.log(req.body);

        Enquiry.findOneAndUpdate({ _id: Id}, { $set: req.body}, function(err, update){
            if(err) {
                console.log(err);
            }else{

                res.json({msg:'success'});
            }
        });
    

}

// Fetch Enquiry
exports.fetchEnquiry = function (req, res) {    
    Enquiry.findOne({ _id:req.params.id}, function (err, enquiryData){
            if(err) {
                console.log(err);
            }else{
                username = req.session.userData;
                res.json({msg:'success', enquiry: enquiryData, username: username})
            }
    });
}

exports.seeTodayFollowupEnquiry = function (req, res){

    if (req.params.id) {

        var userId = mongoose.Types.ObjectId(req.params.id);

        Enquiry.aggregate([

            {
                $match : { $and : [ {marketingPerson: userId }, {"followups.nextFollowupDate": today }]}
            },
            {
                $lookup:
                    {
                        from: "users",
                        localField: "marketingPerson",
                        foreignField: "_id",
                        as: "marketingPersonName"
                    }
            },

                ]).then(function(allEnquiry) {
        
            if(allEnquiry) {
                res.json({msg:'success',enquiry:allEnquiry});
            }else{
                res.json({msg:'success',enquiry: []});
            }
        });

    } else {

        var userId = mongoose.Types.ObjectId(req.session.userId);

        if (req.session.userRole == 1) {
            Enquiry.aggregate([

                {
                    $match : { "followups.nextFollowupDate": today }
                },

                {
                    $lookup:
                        {
                            from: "users",
                            localField: "marketingPerson",
                            foreignField: "_id",
                            as: "marketingPersonName"
                        }
                },
                {
                    $sort : { 'shopName': 1 }
                },

                    ]).then(function(allEnquiry) {
            
                if(allEnquiry) {
                    res.json({msg:'success',enquiry:allEnquiry});
                }else{
                    res.json({msg:'success',enquiry: []});
                }
            });
        }else{
            Enquiry.aggregate([

                {
                    $match : { $and : [ {marketingPerson: userId }, {"followups.nextFollowupDate": today }]}
                },
                {
                    $lookup:
                        {
                            from: "users",
                            localField: "marketingPerson",
                            foreignField: "_id",
                            as: "marketingPersonName"
                        }
                },

                    ]).then(function(allEnquiry) {
            
                if(allEnquiry) {
                    res.json({msg:'success',enquiry:allEnquiry});
                }else{
                    res.json({msg:'success',enquiry: []});
                }
            });
        }  
    }  
}


// Change User
exports.changeUser = function (req, res) {    
    // Enquiry.find({ city :req.body.city}, function (err, enquiryData){
    //         if(err) {
    //             console.log(err);
    //         }else{
                
    //             console.log(enquiryData);
    //         }
    // });

    Enquiry.update({ city :req.body.city}, { $set: {marketingPerson: req.body.marketingPerson}}, {multi: true}, function(err, update){
            if(err) {
                console.log(err);
            }else{

                
               res.json({msg:'success'});
            }
        });
}

// Change User
exports.updateNextFollowupDate = function (req, res) { 

console.log(req.body);   

Enquiry.findOneAndUpdate({ "followups.nextFollowupDate": req.body.oldNextFollowpDate}, { "$set": {"followups.$.nextFollowupDate": req.body.nextFollowupDate, "followups.$.comment": "hiiiiiiiiii"}}, function (err, enquiryData){
            if(err) {
                console.log(err);
            }else{
                
                
            }
    });


    // Enquiry.updateOne({ _id :req.body.enquiryId, "followups.nextFollowupDate": req.body.oldNextFollowpDate}, { $set: {"followups.$.nextFollowupDate": req.body.nextFollowupDate}}, function(err, update){
    //         if(err) {
    //             console.log(err);
    //         }else{

    //             console.log(update);
    //            // res.json({msg:'success'});
    //         }
    //     });
}

//Pending Order
exports.quotationEntry = function (req, res) {

  Enquiry.find({ _id: req.params.id }, function (err, allEnquiry) {
    if (err) {
      console.log(err);
    } else {
      username = req.session.userData;
      res.render("enquiry/quotationEntry", { enquiry: allEnquiry, username: username})
    }
  });
};

exports.createQuotation = function (req, res) {

    id = req.session.userId;

    var d = new Date(); // for now
      var hour = d.getHours(); // => 9
      var minute = d.getMinutes(); // =>  30
      var time = hour+ ':' +minute;

      var visitPhoto1 = req.files.quotation;
      var visitPhotoName1 = today+time+visitPhoto1.name;

      visitPhoto1.mv('./public/quotation/'+visitPhotoName1, function(err){

          if(err){
              console.log(err);
          }else{

            console.log('file uploaded');
          }
      })


          var createQuotation = new Quotation();
          createQuotation.date = today;
          createQuotation.userId = id;
          createQuotation.partyId = req.body.partyId;
          createQuotation.quotationImage = visitPhotoName1;
          createQuotation.role = 1;

          createQuotation.save((err, doc) => {
            res.redirect("/show-enquiry");

          });


            
        
}

exports.fetchQuotation = function (req, res) {    

    var Id = mongoose.Types.ObjectId(req.params.id);

    Quotation.find({ partyId:Id}, function (err, quotationData){
            if(err) {
                console.log(err);
            }else{
                username = req.session.userData;
                res.json({msg:'success', quotation: quotationData, username: username})
            }
    });
}

exports.fetchFollowup = function (req, res) {    

    var Id = mongoose.Types.ObjectId(req.params.id);

    Followup.find({ enquiryId:Id}, function (err, followupData){
            if(err) {
                console.log(err);
            }else{
                username = req.session.userData;
                res.json({msg:'success', followup: followupData, username: username})
            }
    });
}

//Debtor List
exports.showDebtor = function (req, res) { 

    username = req.session.userData;
    res.render("enquiry/showDebtor")
}

exports.allDebtorList = function (req, res) {    

    Enquiry.aggregate([

        {
            $match : { $or:[{ enquiryStatus: "New Dealer"}, { enquiryStatus: "Confirm Dealer"}] }
        },

        {
            $sort : { 'shopName': 1 }
        },

            ]).then(function(allEnquiry) {
    
        if(allEnquiry) {
            res.json({msg:'success',enquiry:allEnquiry});
        }else{
            res.json({msg:'success',enquiry: []});
        }
    });
}
