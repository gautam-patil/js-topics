const User = require('./../models/createUser.model');
const Enquiry = require('./../models/createEnquiry.model');
const Order = require('./../models/createOrder.model');
const Stock = require('./../models/createStock.model');
const Fabricate = require('./../models/createFabricate.model');
const CashEntry = require('./../models/createCashEntry.model');
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

today = yyyy+'-'+mm+'-'+dd;

exports.orderEntry = function (req, res){

	if (req.session.userData) {

        username = req.session.userData;
        role = req.session.userRole;
        id = req.session.userId;

        res.render("order/orderEntry", {username: username, role:role, id:id});
    }else{
        res.redirect("/");
    }
}

//Book Order
exports.boEntry = function (req, res) {

  Enquiry.find({ _id: req.params.id }, function (err, allEnquiry) {
    if (err) {
      console.log(err);
    } else {
      username = req.session.userData;
      res.render("order/boEntry", { enquiry: allEnquiry, username: username})
    }
  });
};

exports.createBO = function (req, res){

  console.log(req.body);

  if (req.body.itemGroupId[0] != "Select Item Group") {


  var createBO = new Order();
    createBO.bookDate = today;
    createBO.bookUserId = req.session.userId;
    createBO.partyId = req.body.partyId;
    createBO.transport = req.body.transport;
    createBO.transportName = req.body.transportName;
    createBO.transportNumber = req.body.transportNumber;
    createBO.packing = req.body.packing;
    createBO.packingDetail = req.body.packingDetail;
    createBO.dispatchDate = req.body.dispatchDate;
    createBO.dispatchUrgentBO = req.body.dispatchUrgentBO;
    createBO.fpDispatchBO = req.body.fpDispatchBO;
    createBO.hardware = req.body.hardware;
    createBO.fitting = req.body.fitting;
    createBO.packingCharge = req.body.packingCharge;
    createBO.transportCharge = req.body.transportCharge;
    createBO.fittingCharge = req.body.fittingCharge;
    createBO.gst = req.body.gst;
    createBO.discount = req.body.discount;
    createBO.commentBO = req.body.commentBO;
    createBO.role = 1;

    createBO.save((err, doc) => {

      


      for (var i = 0; i <= req.body.totalItem; i++) {

        if (req.body.itemId[i]) {


        let createStock = new Stock();
          createStock.date = today;
          createStock.userId = req.session.userId;
          createStock.foreginId = createBO._id;
          createStock.itemGroupId = req.body.itemGroupId[i];
          createStock.itemId = req.body.itemId[i];

          if (req.body.size[i]) {

            createStock.size = req.body.size[i];
            console.log('size hit');
          }
          createStock.rate = req.body.rate[i];
          createStock.quantity = req.body.quantity[i];

          if (req.body.totalSqft[i]) {

            createStock.totalSqft = req.body.totalSqft[i];
            console.log('totalSqft hit');
          }
          createStock.role = 3;
          createStock.godownNo = 3;

          createStock.save((err, doc) => { 

          })
        }else{
          
          console.log('Item Not recieved');          
        }
      }

      res.redirect('/order-entry');
    });
  }else{

    console.log('Order Not recieved');
    res.redirect('/order-entry');
  }
}

//Pending Order
exports.poEntry = function (req, res) {

  Enquiry.find({ _id: req.params.id }, function (err, allEnquiry) {
    if (err) {
      console.log(err);
    } else {
      username = req.session.userData;
      res.render("order/poEntry", { enquiry: allEnquiry, username: username})
    }
  });
};

exports.createPO = function (req, res){

  if (req.body.itemGroupId[0] != "Select Item Group") {

  var createBO = new Order();
    createBO.pendingDate = today;
    createBO.pendingUserId = req.session.userId;
    createBO.partyId = req.body.partyId;
    createBO.pendingOrderNo = req.body.pendingOrderNo;
    createBO.transport = req.body.transport;
    createBO.transportName = req.body.transportName;
    createBO.transportNumber = req.body.transportNumber;
    createBO.packing = req.body.packing;
    createBO.packingDetail = req.body.packingDetail;
    createBO.dispatchDate = req.body.dispatchDate;
    createBO.dispatchUrgentBO = req.body.dispatchUrgentBO;
    createBO.fpDispatchBO = req.body.fpDispatchBO;
    createBO.hardware = req.body.hardware;
    createBO.fitting = req.body.fitting;
    createBO.packingCharge = req.body.packingCharge;
    createBO.transportCharge = req.body.transportCharge;
    createBO.fittingCharge = req.body.fittingCharge;
    createBO.gst = req.body.gst;
    createBO.discount = req.body.discount;
    createBO.commentBO = req.body.commentBO;
    createBO.role = 2;
    createBO.save((err, doc) => {

      for (var i = 0; i <= req.body.totalItem; i++) {

        if (req.body.itemId[i]) {


        let createStock = new Stock();
          createStock.date = today;
          createStock.userId = req.session.userId;
          createStock.foreginId = createBO._id;
          createStock.itemGroupId = req.body.itemGroupId[i];
          createStock.itemId = req.body.itemId[i];

          if (req.body.size[i]) {

            createStock.size = req.body.size[i];
            console.log('size hit');
          }
          createStock.rate = req.body.rate[i];
          createStock.quantity = req.body.quantity[i];

          if (req.body.totalSqft[i]) {

            createStock.totalSqft = req.body.totalSqft[i];
            console.log('totalSqft hit');
          }
          createStock.role = 4;
          createStock.godownNo = 3;

          createStock.save((err, doc) => { 

          })
        }else{
          
          console.log('Item Not recieved');          
        }
      }

      res.redirect('/order-entry');
    });
  }else{

    console.log('Order Not recieved');
    res.redirect('/order-entry');
  }
}


//Confirm Order
exports.coEntry = function (req, res) {

  Enquiry.find({ _id: req.params.id }, function (err, allEnquiry) {
    if (err) {
      console.log(err);
    } else {
      username = req.session.userData;
      res.render("order/coEntry", { enquiry: allEnquiry, username: username})
    }
  });
};

exports.createCO = function (req, res){

  if (req.body.itemGroupId[0] != "Select Item Group") {

  var createCO = new Order();
    createCO.confirmDate = today;
    createCO.confirmUserId = req.session.userId;
    createCO.partyId = req.body.partyId;
    createCO.orderNo = req.body.orderNo;
    createCO.transport = req.body.transport;
    createCO.transportName = req.body.transportName;
    createCO.transportNumber = req.body.transportNumber;
    createCO.packing = req.body.packing;
    createCO.packingDetail = req.body.packingDetail;
    createCO.fabricateDate = req.body.fabricateDate;
    createCO.fabricateUrgent = req.body.fabricateUrgent;
    createCO.fpFabricate = req.body.fpFabricate;
    createCO.dispatchDate = req.body.dispatchDate;
    createCO.dispatchUrgentCO = req.body.dispatchUrgentCO;
    createCO.fpDispatchCO = req.body.fpDispatchCO;
    createCO.hardware = req.body.hardware;
    createCO.fitting = req.body.fitting;
    createCO.packingCharge = req.body.packingCharge;
    createCO.transportCharge = req.body.transportCharge;
    createCO.fittingCharge = req.body.fittingCharge;
    createCO.gst = req.body.gst;
    createCO.discount = req.body.discount;
    createCO.commentCO = req.body.commentCO;
    createCO.role = 3;
    createCO.fabricateDone = 0;
    createCO.checkDone = 0;
    createCO.dispatchDone = 0;
    createCO.billDone = 0;

    createCO.save((err, doc) => {

      for (var i = 0; i <= req.body.totalItem; i++) {

        if (req.body.itemId[i]) {


        let createStock = new Stock();
          createStock.date = today;
          createStock.userId = req.session.userId;
          createStock.foreginId = createCO._id;
          createStock.itemGroupId = req.body.itemGroupId[i];
          createStock.itemId = req.body.itemId[i];

          if (req.body.size[i]) {

            createStock.size = req.body.size[i];
            console.log('size hit');
          }
          createStock.rate = req.body.rate[i];
          createStock.quantity = req.body.quantity[i];

          if (req.body.totalSqft[i]) {

            createStock.totalSqft = req.body.totalSqft[i];
            console.log('totalSqft hit');
          }
          createStock.fabricateRole = req.body.fabricateRole[i];
          createStock.role = 5;
          createStock.godownNo = 3;

          createStock.save((err, doc) => { 

          })
        }else{
          
          console.log('Item Not recieved');          
        }
      }

      res.redirect('/order-entry');
    });
  }else{

    console.log('Order Not recieved');
    res.redirect('/order-entry');
  }
}

//Booking Page
exports.bookOrder = function (req, res){

    if (req.session.userData) {

        username = req.session.userData;
        role = req.session.userRole;
        id = req.session.userId;

        res.render("order/bookOrder", {username: username, role:role, id:id});
    }else{
        res.redirect("/");
    }
}

exports.allBookOrder = function (req, res) {

  Order.aggregate([

    {
      $match : { role: 1}
    },

    {
      $lookup:
          {
              from: "users",
              localField: "bookUserId",
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

  ]).then(function(allBookOrder) {

    if(allBookOrder) {
        res.json({msg:'success',bookOrder:allBookOrder});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.bookPendingEntry = function (req, res) {  

    var Id = mongoose.Types.ObjectId(req.params.id);  

    Order.aggregate([

    {
      $match : { _id: Id}
    },

    {
      $lookup:
          {
              from: "users",
              localField: "bookUserId",
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

  ]).then(function(allBookOrder) {

    if(allBookOrder) {
        ;
        username = req.session.userData;
        res.render("order/bookPendingEntry", { bookOrder: allBookOrder, username: username})
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
}

exports.pendingBookOrder = function (req, res) {

  req.body.pendingUserId = req.session.userId;
  req.body.pendingDate = today;
  req.body.role = 2;

  Order.findOneAndUpdate({ _id:req.body.orderId}, { $set: req.body}, function(err, update){
      if(err) {
          console.log(err);
      }else{

          res.json({msg:'success'});
      }
  });
}

//Pending Order
exports.pendingOrder = function (req, res){

    if (req.session.userData) {

        username = req.session.userData;
        role = req.session.userRole;
        id = req.session.userId;

        res.render("order/pendingOrder", {username: username, role:role, id:id});
    }else{
        res.redirect("/");
    }
}

exports.allPendingOrder = function (req, res) {

  Order.aggregate([

    {
      $match : { role: 2}
    },

    {
      $lookup:
          {
              from: "users",
              localField: "pendingUserId",
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

  ]).then(function(allPendingOrder) {

    if(allPendingOrder) {
        res.json({msg:'success',pendingOrder:allPendingOrder});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.allPendingBillConfirmOrder = function (req, res) {

  Order.aggregate([

    {
      $match : { $and: [{ billDone: 0}, {role: 3}]}                  
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

  ]).then(function(allConfirmOrder) {

    if(allConfirmOrder) {
        res.json({msg:'success',confirmOrder:allConfirmOrder});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.allPartyConfirmOrder = function (req, res) {

  var Id = mongoose.Types.ObjectId(req.params.id);  

  Order.aggregate([

    {
      $match : { $and:[ { partyId: Id},{ role: 3 },{billDone: 0}]}
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

  ]).then(function(allConfirmOrder) {

    if(allConfirmOrder) {
        res.json({msg:'success',confirmOrder:allConfirmOrder});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.pendingConfirmEntry = function (req, res) {  

    var Id = mongoose.Types.ObjectId(req.params.id);  

    Order.aggregate([

    {
      $match : { _id: Id}
    },

    {
      $lookup:
          {
              from: "users",
              localField: "bookUserId",
              foreignField: "_id",
              as: "bookUser"
          }
    },
    {
      $lookup:
          {
              from: "users",
              localField: "pendingUserId",
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

  ]).then(function(allPendingOrder) {

    if(allPendingOrder) {
        ;
        username = req.session.userData;
        res.render("order/pendingConfirmEntry", { pendingOrder: allPendingOrder, username: username})
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
}

exports.confirmPendingOrder = function (req, res) {

  req.body.confirmUserId = req.session.userId;
  req.body.confirmDate = today;
  req.body.fabricateDone = 0;
  req.body.checkDone = 0;
  req.body.dispatchDone = 0;
  req.body.billDone = 0;
  req.body.role = 3;

  Order.findOneAndUpdate({ _id:req.body.orderId}, { $set: req.body}, function(err, update){
      if(err) {
          console.log(err);
      }else{

          res.json({msg:'success'});
      }
  });
}




//See Order
exports.seeOrder = function (req, res){

    if (req.session.userData) {

        username = req.session.userData;
        role = req.session.userRole;
        id = req.session.userId;

        res.render("order/seeOrder", {username: username, role:role, id:id});
    }else{
        res.redirect("/");
    }
}

exports.searchOrder = function (req, res) {

    console.log(req.body);

    var searchTermArray = [];
    var condition = [];
    var searchTerm = req.body.searchTerm;
    var role = req.body.orderRole;


    if (searchTerm) {

        Int = parseInt(searchTerm);

        searchTermArray.push({"enquiries.shopName":  {$regex: searchTerm} });
        searchTermArray.push({"enquiries.mobile": Int});
        condition = [{$or : searchTermArray}];
    }

    if (role) {

        IntRole = parseInt(role);

        condition.push({role: IntRole});
    }

    console.log(condition);

    console.log("Search Term");
    console.log(searchTermArray);

    Order.aggregate(
        [

        {
            $lookup:
                {
                    from: "enquiries",
                    localField: "partyId",
                    foreignField: "_id",
                    as: "enquiries"
                }
        },
        {$match : { $and: condition } },
        {
            $lookup:
                {
                    from: "users",
                    localField: "bookUserId",
                    foreignField: "_id",
                    as: "bookUser"
                }
        },
        {
            $lookup:
                {
                    from: "users",
                    localField: "pendingUserId",
                    foreignField: "_id",
                    as: "pendingUser"
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
                  localField: "fabricateUserId",
                  foreignField: "_id",
                  as: "fabricateUser"
              }
        },
        {
          $lookup:
              {
                  from: "users",
                  localField: "checkUserId",
                  foreignField: "_id",
                  as: "checkUser"
              }
        },
        {
            $sort : { 'enquiries.shopName': 1 }
        },        
            

                ]).then(function(allOrder) {
        
            if(allOrder) {
                console.log(allOrder);
                res.json({msg:'success',order:allOrder});
            }else{
                res.json({msg:'success',order: []});
            }
    });
}

exports.viewOrder = function (req, res) {  

    var Id = mongoose.Types.ObjectId(req.params.id);  

    Order.aggregate([

    {
      $match : { _id: Id}
    },

    {
      $lookup:
          {
              from: "users",
              localField: "bookUserId",
              foreignField: "_id",
              as: "bookUser"
          }
    },
    {
      $lookup:
          {
              from: "users",
              localField: "pendingUserId",
              foreignField: "_id",
              as: "pendingUser"
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

  ]).then(function(allOrder) {

    if(allOrder) {
        ;
        username = req.session.userData;
        res.render("order/viewOrder", { order: allOrder, username: username})
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
}

exports.createSaleBillPage = function (req, res){

    if (req.session.userData) {

        username = req.session.userData;
        role = req.session.userRole;
        id = req.session.userId;

        res.render("order/createSaleBill", {username: username, role:role, id:id});
    }else{
        res.redirect("/");
    }
}

exports.searchOrderId = function (req, res) {    

    
    var Id = mongoose.Types.ObjectId(req.params.id); 
    console.log(Id); 

    Order.aggregate([

      {
        $match : { _id: Id}
      },

      {
        $lookup:
            {
                from: "stocks",
                localField: "_id",
                foreignField: "foreginId",
                as: "stock"
            }
      },
      

    ]).then(function(orderData) {

      if(orderData) {

          res.json({msg:'success',orders: orderData});
      }else{
      }
    })
}

//Pending Confirm Order
exports.allMisOrder = function (req, res) {

  Order.aggregate([

    {
      $match : { $or: [{fabricateDone: 0}, {checkDone: 0}, {dispatchDone: 0}]}
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
              localField: "fabricateUserId",
              foreignField: "_id",
              as: "fabricateUser"
          }
    },
    {
      $lookup:
          {
              from: "users",
              localField: "checkUserId",
              foreignField: "_id",
              as: "checkUser"
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

  ]).then(function(allConfirmOrder) {

    if(allConfirmOrder) {

        res.json({msg:'success',order:allConfirmOrder});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};


exports.misOrderReport = function (req, res){

    if (req.session.userData) {

        username = req.session.userData;
        role = req.session.userRole;
        id = req.session.userId;

        res.render("order/misOrderReport", {username: username, role:role, id:id});
    }else{
        res.redirect("/");
    }
}


exports.updateFabricateOrder = function (req, res) {

  var date = new Date();
  var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  req.body.fabricateUserId = req.session.userId;
  req.body.fabricateDoneDate = today;
  req.body.fabricateDoneTime = time;
  req.body.fabricateDone = 1;

  console.log(req.body);

  Order.findOneAndUpdate({ _id:req.body.orderId}, { $set: req.body}, function(err, update){
      if(err) {
          console.log(err);
      }else{

          res.json({msg:'success'});
      }
  });
}


exports.updateFabricateOrder = function (req, res) {

  var date = new Date();
  var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  req.body.fabricateUserId = req.session.userId;
  req.body.fabricateDoneDate = today;
  req.body.fabricateDoneTime = time;
  req.body.fabricateDone = 1;

  console.log(req.body);

  Order.findOneAndUpdate({ _id:req.body.orderId}, { $set: req.body}, function(err, update){
      if(err) {
          console.log(err);
      }else{

          res.json({msg:'success'});
      }
  });
}

exports.updateCheckOrder = function (req, res) {

  var date = new Date();
  var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  req.body.checkUserId = req.session.userId;
  req.body.checkDoneDate = today;
  req.body.checkDoneTime = time;
  req.body.checkDone = 1;

  console.log(req.body);

  Order.findOneAndUpdate({ _id:req.body.orderId}, { $set: req.body}, function(err, update){
      if(err) {
          console.log(err);
      }else{

          res.json({msg:'success'});
      }
  });
}

exports.updateDispatchOrder = function (req, res) {

  var date = new Date();
  var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  req.body.dispatchUserId = req.session.userId;
  req.body.dispatchDoneDate = today;
  req.body.dispatchDoneTime = time;
  req.body.dispatchDone = 1;

  console.log(req.body);

  Order.findOneAndUpdate({ _id:req.body.orderId}, { $set: req.body}, function(err, update){
      if(err) {
          console.log(err);
      }else{

          res.json({msg:'success'});
      }
  });
}

//All Bill Order
exports.allBillOrder = function (req, res) {

  var Id = mongoose.Types.ObjectId(req.params.id); 

  Order.aggregate([

    {
      $match : { billId: Id}
    },

    {
      $lookup:
          {
              from: "stocks",
              localField: "_id",
              foreignField: "foreginId",
              as: "stock"
          }
    },

  ]).then(function(allOrder) {

    if(allOrder) {
        res.json({msg:'success',order:allOrder});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.seeSaleBill = function (req, res){

    if (req.session.userData) {

        username = req.session.userData;
        role = req.session.userRole;
        id = req.session.userId;

        res.render("order/seeSaleBill", {username: username, role:role, id:id});
    }else{
        res.redirect("/");
    }
}

exports.searchSaleBill = function (req, res) {

  CashEntry.aggregate([

    {
      $match : { $and: [{role: 1}, {date: req.body.date}]}
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
    {
      $lookup:
          {
              from: "enquiries",
              localField: "partyId",
              foreignField: "_id",
              as: "saleParty"
          }
    },

  ]).then(function(allSaleBill) {

    if(allSaleBill) {

        res.json({msg:'success',saleBill:allSaleBill});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.viewSaleBill = function (req, res) {  

    var Id = mongoose.Types.ObjectId(req.params.id);  

    CashEntry.aggregate([

    {
      $match : { _id: Id}
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
    {
      $lookup:
          {
              from: "enquiries",
              localField: "partyId",
              foreignField: "_id",
              as: "saleParty"
          }
    },

  ]).then(function(allSaleBill) {

    if(allSaleBill) {
        ;
        username = req.session.userData;
        res.render("order/viewSaleBill", { saleBill: allSaleBill, username: username})
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
}

exports.fetchBillOrder = function (req, res) {  

    var Id = mongoose.Types.ObjectId(req.params.id);  

    Order.aggregate([

    {
      $match : { billId: Id}
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
    {
      $lookup:
          {
              from: "stocks",
              localField: "_id",
              foreignField: "foreginId",
              as: "stock"
          }
    },

  ]).then(function(allOrder) {

    if(allOrder) {
        ;
        username = req.session.userData;
        res.json({msg:'success',order: allOrder});
    }else{
        res.json({msg:'success',order: allOrder});
    }
  })
}

exports.updateOrder = function (req, res) {

  var Id = mongoose.Types.ObjectId(req.params.id);  

  Order.findOneAndUpdate({ _id: Id}, { $set: req.body}, function(err, update){
      if(err) {
          console.log(err);
      }else{

          res.json({msg:'success'});
      }
  });
}

exports.deleteOrderData = function (req, res) {


    console.log(req.body);
    var Id = mongoose.Types.ObjectId(req.body.orderId);  

    Order.findOneAndDelete({ _id: Id }, function(err, update){
        if(err) {
            console.log(err);
        }else{

          console.log(update);

            res.json({msg:'success'});
        }
    });
    

}

exports.createFabricateItem = function (req, res){

  console.log(req.body);

  if (req.body.itemGroupId[0] != "Select Item Group") {

  var Id = mongoose.Types.ObjectId(req.body.fabricateItemId); 

  Stock.findOneAndUpdate({ _id: Id}, { $set: {fabricateRole: 2 } }, function(err, update){
      if(err) {
          console.log(err);
      }else{
      }
  });


  var createFab = new Fabricate();
    createFab.date = today;
    createFab.userId = req.session.userId;
    createFab.orderId = req.body.orderId;
    createFab.fabricateItemId = req.body.fabricateItemId;
    createFab.roundOff = req.body.roundOff;
    createFab.roundOffFab = req.body.roundOffFab;
    createFab.comment = req.body.comment;

    createFab.save((err, doc) => {

      for (var i = 0; i <= req.body.totalItem; i++) {

        if (req.body.itemId[i]) {


        let createStock = new Stock();
          createStock.date = today;
          createStock.userId = req.session.userId;
          createStock.foreginId = createFab._id;
          createStock.itemGroupId = req.body.itemGroupId[i];
          createStock.itemId = req.body.itemId[i];

          if (req.body.size[i]) {

            createStock.size = req.body.size[i];
            console.log('size hit');
          }
          createStock.rate = req.body.rate[i];
          createStock.quantity = req.body.quantity[i];

          if (req.body.totalSqft[i]) {

            createStock.totalSqft = req.body.totalSqft[i];
            console.log('totalSqft hit');
          }
          createStock.role = 6;
          createStock.godownNo = 3;

          createStock.save((err, doc) => { 

          })
        }else{
          
          console.log('Item Not recieved');          
        }
      }

      for (var a = 0; a <= req.body.totalItemFab; a++) {

        if (req.body.itemIdFab[a]) {

          console.log('a='+ a);


        let createStock = new Stock();
          createStock.date = today;
          createStock.userId = req.session.userId;
          createStock.foreginId = createFab._id;
          createStock.itemGroupId = req.body.itemGroupIdFab[a];
          createStock.itemId = req.body.itemIdFab[a];

          if (req.body.sizeFab[a]) {

            createStock.size = req.body.sizeFab[a];
            console.log('size hit');
          }
          createStock.rate = req.body.rateFab[a];
          createStock.quantity = req.body.quantityFab[a];

          if (req.body.totalSqftFab[a]) {

            createStock.totalSqft = req.body.totalSqftFab[a];
            console.log('totalSqft hit');
          }
          createStock.role = 7;
          createStock.godownNo = 3;

          createStock.save((err, doc) => { 

          })
        }else{
          
          console.log('Item Not recieved');          
        }
      }

      res.redirect('/fabricate-stock');
    });
  }else{

    console.log('Order Not recieved');
    res.redirect('/fabricate-stock');
  }
}

exports.viewFabricate = function (req, res) {  

    var Id = mongoose.Types.ObjectId(req.params.id);  

    Fabricate.aggregate([

    {
      $match : { fabricateItemId: Id}
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
    {
      $lookup:
          {
              from: "orders",
              localField: "orderId",
              foreignField: "_id",
              as: "order"
          }
    },

  ]).then(function(fabricateItem) {

    if(fabricateItem) {
      console.log('-----');
        console.log(fabricateItem);
        username = req.session.userData;
        res.render("order/viewFabricate", { fabricate: fabricateItem, username: username})
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
}