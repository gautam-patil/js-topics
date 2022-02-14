const ItemGroup = require('./../models/createItemGroup.model');
const ItemName = require('./../models/createItemName.model');
const PurchaseStock = require('./../models/createPurchaseStock.model');
const Stock = require('./../models/createStock.model');
const PurchaseGroup = require('./../models/createPurchaseGroup.model');
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

exports.itemGroup = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/itemGroup");
  } else {
    res.redirect("/");
  }
};

exports.deleteItemData = function (req, res) {


    console.log(req.body);
    var Id = mongoose.Types.ObjectId(req.body.Id);  

    Stock.findOne({ itemId : Id }, function(err, update){
        if(err) {
            console.log(err);
        }else{

          if (!update) {

            ItemName.findOneAndDelete({ _id: Id }, function(err, update){
                if(err) {
                    console.log(err);
                }else{

                  console.log(update);

                    res.json({msg:'success'});
                }
            });

          }else{

            res.json({msg: 'fail'});
          }
        }
    });

    // Stock.findOneAndDelete({ _id: Id }, function(err, update){
    //     if(err) {
    //         console.log(err);
    //     }else{

    //       console.log(update);

    //         res.json({msg:'success'});
    //     }
    // });
    

}

exports.createItemGroup = function (req, res){

  var createItemGroup = new ItemGroup();
    createItemGroup.itemGroupName = req.body.itemGroupName;
    createItemGroup.aboutItemGroup = req.body.aboutItemGroup;

    createItemGroup.save((err, doc) => {
      res.json({msg:'success'});  
    });
}

exports.allItemGroup = function (req, res) {
  ItemGroup.find({}, function (err, allItemGroup) {
    if (err) {
      console.log(err);
    } else {
      res.json({ msg: "success", itemGroup: allItemGroup });
    }
  });
};

exports.allItemName = function (req, res) {

  if (req.params.id) {

    const itemGroupId = req.params.id;
    var Id = mongoose.Types.ObjectId(itemGroupId);  

    ItemName.aggregate([

      {
        $match : { itemGroupId: Id}
      },
      {
        $lookup:
            {
                from: "groupnames",
                localField: "groupNameId",
                foreignField: "_id",
                as: "groupName"
            }
      },
      {
            $sort : { 'itemName': 1 }
      }, 

    ]).then(function(allItemName) {

      if(allItemName) {

          res.json({ msg: "success", itemName: allItemName });
      }else{
          res.json({msg:'success',itemName: []});
      }
    })

  } else {

    //For Stock Report

    const itemGroupId = req.body.itemGroupId;

    var Id = mongoose.Types.ObjectId(itemGroupId);  

    ItemName.aggregate([

      {
        $match : { itemGroupId: Id}
      },

      {
        $lookup:
            {
                from: "stocks",
                localField: "_id",
                foreignField: "itemId",
                as: "stock"
            }
      },
      {
            $sort : { 'itemName': 1 }
      }, 

    ]).then(function(allItemName) {

      if(allItemName) {

          res.json({ msg: "success", itemName: allItemName });
      }else{
          res.json({msg:'success',itemName: []});
      }
    })
  }
};

exports.fetchAllItemName = function (req, res) {

  ItemName.find({}, function (err, allItemName) {
    if (err) {
      console.log(err);
    } else {
      res.json({ msg: "success", itemName: allItemName });
    }
  });
};

exports.createItemName = function (req, res){

  var createItemName = new ItemName();
    createItemName.itemGroupId = req.body.itemGroupId;
    createItemName.itemName = req.body.itemName;
    createItemName.subItemName = req.body.subItemName;
    createItemName.aboutItem = req.body.aboutItem;
    createItemName.groupNameId = req.body.groupNameId;
    if (req.body.colourId) {

      createItemName.colourId = req.body.colourId;
    }
    if (req.body.sizeId) {

      createItemName.sizeId = req.body.sizeId;
    } 
    createItemName.opening = req.body.opening;
    createItemName.rate = req.body.rate;
    createItemName.sqFt = req.body.sqFt;
    createItemName.minimumQuantity = req.body.minimumQuantity;
    createItemName.unit = req.body.unit;``
    createItemName.thick = req.body.thick;
    createItemName.size = req.body.size;
    createItemName.regular = req.body.regular;
    createItemName.fabrication = req.body.fabrication;
    createItemName.quantitySqft = req.body.quantitySqft;

    createItemName.save((err, doc) => {
      res.json({msg:'success'});  
    });
}

//Purchase stock
exports.purchaseStock = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/purchaseStock");
  } else {
    res.redirect("/");
  }
};

exports.createPurchaseStock = function (req, res){

  if (req.body.itemGroupId[0] != "Select Item Group") {

  console.log(req.body);
  var createPurchaseStock = new CashEntry();
    createPurchaseStock.date = today;
    createPurchaseStock.userId = req.session.userId;
    createPurchaseStock.partyId = req.body.purchasePartyId;
    createPurchaseStock.billNo = req.body.invoiceNo;
    createPurchaseStock.packingCharge = req.body.packingCharge;
    createPurchaseStock.transportCharge = req.body.transportCharge;
    createPurchaseStock.fittingCharge = req.body.fittingCharge;
    createPurchaseStock.gst = req.body.gst;
    createPurchaseStock.discount = req.body.discount;
    createPurchaseStock.comment = req.body.comment;
    createPurchaseStock.role = 3;
    createPurchaseStock.receiveDone = 0;

    createPurchaseStock.save((err, doc) => {

      for (var i = 0; i <= req.body.totalItem; i++) {

        if (req.body.itemId[i]) {


        let createStock = new Stock();
          createStock.date = today;
          createStock.userId = req.session.userId;
          createStock.foreginId = doc._id;
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
          createStock.role = 1;
          createStock.godownNo = 1;

          createStock.save((err, doc) => { 

          })
        }else{
          
          console.log('Item Not recieved');          
        }
      }

      res.redirect('/purchase-stock');
    });
   }else{

    console.log('Order Not recieved');
    res.redirect('/purchase-stock');
  }
}

//Recieve Stock

exports.receivePurchaseStock = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/receivePurchaseStock");
  } else {
    res.redirect("/");
  }
};

exports.allNotReceivePurchaseStock = function (req, res) {

  CashEntry.aggregate([

    {
      $match : { $and: [{role: 3 }, {receiveDone: 0}]}
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
              from: "purchaseparties",
              localField: "partyId",
              foreignField: "_id",
              as: "purchaseParty"
          }
    },

  ]).then(function(allPurchaseStock) {

    if(allPurchaseStock) {
        res.json({msg:'success',purchaseStock:allPurchaseStock});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.receivePurchaseEntry = function (req, res) {  

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
              from: "purchaseparties",
              localField: "partyId",
              foreignField: "_id",
              as: "purchaseParty"
          }
    },

  ]).then(function(allPurchaseStock) {

    if(allPurchaseStock) {
      console.log(allPurchaseStock);
        username = req.session.userData;
        res.render("stock/receivePurchaseEntry", { purchaseStock: allPurchaseStock, username: username})
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
}

exports.receiveStockConfirm = function (req, res) {

  console.log('-------');

  CashEntry.findOneAndUpdate({ _id:req.params.id}, { $set: {receiveDone: 1, receiveComment: req.body.comment} }, function(err, update){
      if(err) {
          console.log(err);
      }else{

          res.json({msg:'success'});
      }
  });
}
//End-Receive

exports.confirmPurchaseStock = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/confirmPurchaseStock");
  } else {
    res.redirect("/");
  }
};

exports.allNotConfirmPurchaseStock = function (req, res) {

  PurchaseStock.aggregate([

    {
      $match : { role: 1}
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
              from: "purchaseparties",
              localField: "purchasePartyId",
              foreignField: "_id",
              as: "purchaseParty"
          }
    },

  ]).then(function(allPurchaseStock) {

    if(allPurchaseStock) {
        res.json({msg:'success',purchaseStock:allPurchaseStock});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.confirmPurchaseEntry = function (req, res) {  

    var Id = mongoose.Types.ObjectId(req.params.id);  

    PurchaseStock.aggregate([

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
              from: "purchaseparties",
              localField: "purchasePartyId",
              foreignField: "_id",
              as: "purchaseParty"
          }
    },

  ]).then(function(allPurchaseStock) {

    if(allPurchaseStock) {
      console.log(allPurchaseStock);
        username = req.session.userData;
        res.render("stock/confirmPurchaseEntry", { purchaseStock: allPurchaseStock, username: username})
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
}

exports.fetchPurchaseItemName = function (req, res) {

  var Id = mongoose.Types.ObjectId(req.params.id);  

    Stock.aggregate([

    {
      $match : { foreginId: Id}
    },

    {
      $lookup:
          {
              from: "itemnames",
              localField: "itemId",
              foreignField: "_id",
              as: "item"
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

  ]).then(function(allPurchaseStock) {

    if(allPurchaseStock) {
        res.json({msg:'success',purchaseStock:allPurchaseStock});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.receiveStockData = function (req, res) {

  req.body.receiveBy = req.session.userId;
  req.body.receiveDate = today;
  req.body.role = 2;

  Stock.findOneAndUpdate({ _id:req.body.stockItemId}, { $set: req.body}, function(err, update){
      if(err) {
          console.log(err);
      }else{

          res.json({msg:'success'});
      }
  });
}

exports.addReceiveStock = function (req, res){

  var createNewStock = new Stock();
    createNewStock.receiveDate = today;
    createNewStock.receiveBy = req.session.userId;
    createNewStock.receiveQuantity = req.body.receiveQuantity;
    createNewStock.foreginId = req.body.foreginId;
    createNewStock.itemGroupId = req.body.itemGroupId;
    createNewStock.itemId = req.body.itemId;
    createNewStock.godownNo = 1;
    createNewStock.role = 2;

    createNewStock.save((err, doc) => {
      res.json({msg:'success'});  
    });
}

// Update Stock
exports.updateStockData = function (req, res) {

  console.log(req.body);

    Stock.findOneAndUpdate({ _id:req.body.stockItemId}, { $set: req.body}, function(err, update){
        if(err) {
            console.log(err);
        }else{

            res.json({msg:'success'});
        }
    });
    
}

exports.addStockData = function (req, res){

  var createNewStock = new Stock();
    createNewStock.date = today;
    createNewStock.userId = req.session.userId;
    createNewStock.foreginId = req.body.foreginId;
    createNewStock.size = req.body.size;
    createNewStock.rate = req.body.rate;
    createNewStock.quantity = req.body.quantity;
    createNewStock.totalSqft = req.body.totalSqft;
    createNewStock.comment = req.body.comment;
    createNewStock.itemGroupId = req.body.itemGroupId;
    createNewStock.itemId = req.body.itemId;
    createNewStock.godownNo = req.body.godownNo;
    createNewStock.byGodownNo = req.body.byGodownNo;
    createNewStock.toGodownNo = req.body.toGodownNo;
    createNewStock.role = req.body.role;

    createNewStock.save((err, doc) => {
      res.json({msg:'success'});  
    });
}

exports.seeStock = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/seeStock");
  } else {
    res.redirect("/");
  }
};

exports.seeGodownOneStock = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/seeGodownOneStock");
  } else {
    res.redirect("/");
  }
};

exports.seeGodownTwoStock = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/seeGodownTwoStock");
  } else {
    res.redirect("/");
  }
};

exports.seeGodownThreeStock = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/seeGodownThreeStock");
  } else {
    res.redirect("/");
  }
};

exports.godownTransfer = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/godownTransfer");
  } else {
    res.redirect("/");
  }
};

//Physical Stock

exports.physicalStock = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/physicalStock");
  } else {
    res.redirect("/");
  }
};

exports.addPhysicalStock = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/addPhysicalStock");
  } else {
    res.redirect("/");
  }
};

exports.searchPhysicalStock= function (req, res) {

  var Id = mongoose.Types.ObjectId(req.body.itemGroupId);  

    Stock.aggregate([

    {
      $match : { $and: [{itemGroupId: Id}, {date: req.body.date}, {role: 8}]}
    },

    {
      $lookup:
          {
              from: "itemnames",
              localField: "itemId",
              foreignField: "_id",
              as: "item"
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
    {
            $sort : { 'item.itemName': 1 }
    }, 

  ]).then(function(allPhysicalStock) {

    if(allPhysicalStock) {
        res.json({msg:'success',physicalStock:allPhysicalStock});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.createPhysicalStock = function (req, res){



      for (var i = 0; i <= req.body.totalItem; i++) {
        
        let createStock = new Stock();
          createStock.date = today;
          createStock.userId = req.session.userId;;
          createStock.itemGroupId = req.body.itemGroupId[i];
          createStock.itemId = req.body.itemId[i];
          createStock.quantity = req.body.quantity[i];
          createStock.role = 8;

          createStock.save((err, doc) => { 

          })
      }

      res.redirect('/physical-stock');
}

//Tally Stock

exports.tallyStock = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/tallyStock");
  } else {
    res.redirect("/");
  }
};

exports.addTallyStock = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/addTallyStock");
  } else {
    res.redirect("/");
  }
};

exports.searchTallyStock= function (req, res) {

  var Id = mongoose.Types.ObjectId(req.body.itemGroupId);  

    Stock.aggregate([

    {
      $match : { $and: [{itemGroupId: Id}, {date: req.body.date}, {role: 9}]}
    },

    {
      $lookup:
          {
              from: "itemnames",
              localField: "itemId",
              foreignField: "_id",
              as: "item"
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

  ]).then(function(allTallyStock) {

    if(allTallyStock) {
        res.json({msg:'success',tallyStock:allTallyStock});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};
exports.createTallyStock = function (req, res){



      for (var i = 0; i <= req.body.totalItem; i++) {
        
        let createStock = new Stock();
          createStock.date = today;
          createStock.userId = req.session.userId;;
          createStock.itemGroupId = req.body.itemGroupId[i];
          createStock.itemId = req.body.itemId[i];
          createStock.quantity = req.body.quantity[i];
          createStock.role = 9;

          createStock.save((err, doc) => { 

          })
      }

      res.redirect('/tally-stock');
}

exports.purchaseBooking = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/purchaseBooking");
  } else {
    res.redirect("/");
  }
};

exports.addPurchaseBooking = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/addPurchaseBooking");
  } else {
    res.redirect("/");
  }
};

exports.createPurchaseBooking = function (req, res){

  for (var i = 0; i <= req.body.totalItem; i++) {

    let createStock = new Stock();
      createStock.date = today;
      createStock.userId = req.session.userId;;
      createStock.itemGroupId = req.body.itemGroupId[i];
      createStock.itemId = req.body.itemId[i];
      createStock.quantity = req.body.quantity[i];
      createStock.rate = req.body.rate[i];
      createStock.purchaseBookingNo = req.body.purchaseBookingNo[i];
      createStock.role = 10;

      createStock.save((err, doc) => { 

      })
  }

  res.redirect('/purchase-booking');
}

exports.searchPurchaseBooking = function (req, res) {

    var condition = [];
    
    if (req.body.itemGroupId) {

    var itemGroupId = req.body.itemGroupId;

    var Id = mongoose.Types.ObjectId(itemGroupId);  
    }

    var purchaseBookingNo = req.body.purchaseBookingNo;


    if (itemGroupId) {

        condition.push({itemGroupId: Id});
    }

    if (purchaseBookingNo) {

        condition.push({purchaseBookingNo: purchaseBookingNo});
    }

    condition.push({role: 10});

    Stock.aggregate(
        [

        {$match : { $and: condition } },  

        {
          $lookup:
              {
                  from: "itemnames",
                  localField: "itemId",
                  foreignField: "_id",
                  as: "item"
              }
        },
        {
          $lookup:
              {
                  from: "itemgroups",
                  localField: "itemGroupId",
                  foreignField: "_id",
                  as: "itemGroup"
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
            

                ]).then(function(allPurchaseBooking) {
        
            if(allPurchaseBooking) {

                res.json({msg:'success',purchaseBooking:allPurchaseBooking});
            }else{
                res.json({msg:'success',purchaseBooking: []});
            }
    });
}

exports.createPurchaseBookingGroup = function (req, res){

  var createNewPurchaseGroup = new PurchaseGroup();
    createNewPurchaseGroup.bookDate = today;
    createNewPurchaseGroup.bookUserId = req.session.userId;
    createNewPurchaseGroup.partyId = req.body.partyId;
    createNewPurchaseGroup.purchaseBookingNo = req.body.purchaseBookingNo;
    createNewPurchaseGroup.comment = req.body.comment;
    createNewPurchaseGroup.role = 1;

    createNewPurchaseGroup.save((err, doc) => {
      res.json({msg:'success'});  
    });
}

exports.purchaseGroup = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("stock/purchaseGroup");
  } else {
    res.redirect("/");
  }
};

exports.searchPurchaseGroup = function (req, res) {

    var condition = [];

    var purchaseBookingNo = req.body.purchaseBookingNo;
    var role = req.body.role;

    if (purchaseBookingNo) {

        condition.push({purchaseBookingNo: purchaseBookingNo});
    }

    if (role) {

        var Int = parseInt(role);

        condition.push({role: Int});
    }


    PurchaseGroup.aggregate(
        [

        {$match : { $and: condition } },  

        {
          $lookup:
              {
                  from: "purchaseparties",
                  localField: "partyId",
                  foreignField: "_id",
                  as: "purchaseParty"
              }
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
                  localField: "confirmUserId",
                  foreignField: "_id",
                  as: "confirmUser"
              }
        },   
            

                ]).then(function(allPurchaseGroup) {
        
            if(allPurchaseGroup) {

                res.json({msg:'success',purchaseGroup:allPurchaseGroup});
            }else{
                res.json({msg:'success',purchaseBooking: []});
            }
    });
}

exports.viewPurchaseBooking = function (req, res) {  

    var Id = mongoose.Types.ObjectId(req.params.id);  

    PurchaseGroup.aggregate([

    {
      $match : { _id: Id}
    },

    {
      $lookup:
          {
              from: "purchaseparties",
              localField: "partyId",
              foreignField: "_id",
              as: "purchaseParty"
          }
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
              localField: "confirmUserId",
              foreignField: "_id",
              as: "confirmUser"
          }
    },   

  ]).then(function(allPurchaseBooking) {

    if(allPurchaseBooking) {
        ;
        username = req.session.userData;
        res.render("stock/viewPurchaseBooking", { purchaseBooking: allPurchaseBooking, username: username})
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
}

exports.updateItemName = function (req, res) {


        console.log(req.body);

        ItemName.findOneAndUpdate({ _id:req.body.itemId}, { $set: req.body}, function(err, update){
            if(err) {
                console.log(err);
            }else{

              console.log(update);

                res.json({msg:'success'});
            }
        });
    

}

exports.fabricateStock = function (req, res) {  

  if (req.session.userData) {

        username = req.session.userData;
        role = req.session.userRole;
        id = req.session.userId;

        res.render("order/fabricateStock", {username: username, role:role, id:id});
    }else{
        res.redirect("/");
    }
}

exports.allNotFabricateStock = function (req, res) {

  Stock.aggregate([

    {
      $match : { fabricateRole: 1 }
    },

    {
      $lookup:
          {
              from: "orders",
              localField: "foreginId",
              foreignField: "_id",
              as: "order"
          }
    },
    {
      $lookup:
          {
              from: "itemnames",
              localField: "itemId",
              foreignField: "_id",
              as: "itemName"
          }
    },

  ]).then(function(allStock) {

    if(allStock) {
        res.json({msg:'success',stock:allStock});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.fabricateEntry = function (req, res) {

  var Id = mongoose.Types.ObjectId(req.params.id);  

  Stock.aggregate([

    {
      $match : { _id: Id }
    },

    {
      $lookup:
          {
              from: "orders",
              localField: "foreginId",
              foreignField: "_id",
              as: "order"
          }
    },
    {
      $lookup:
          {
              from: "itemnames",
              localField: "itemId",
              foreignField: "_id",
              as: "itemName"
          }
    },
    {
      $lookup:
          {
              from: "itemgroups",
              localField: "itemGroupId",
              foreignField: "_id",
              as: "itemGroup"
          }
    },

  ]).then(function(allStock) {

    if(allStock) {
      console.log(allStock);
        res.render("order/fabricateEntry", { fabricateItem: allStock, username: username})
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.deleteStockData = function (req, res) {


    console.log(req.body);
    var Id = mongoose.Types.ObjectId(req.body.stockId);  

    Stock.findOneAndDelete({ _id: Id }, function(err, update){
        if(err) {
            console.log(err);
        }else{

          console.log(update);

            res.json({msg:'success'});
        }
    });
    

}

exports.fetchFabricateStock = function (req, res) {

  var Id = mongoose.Types.ObjectId(req.params.id);  

    Stock.aggregate([

    {
      $match : { foreginId: Id}
    },

    {
      $lookup:
          {
              from: "itemnames",
              localField: "itemId",
              foreignField: "_id",
              as: "item"
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

  ]).then(function(allFabriateStock) {

    if(allFabriateStock) {
        res.json({msg:'success',fabricateStock:allFabriateStock});
    }else{
        res.json({msg:'success',fabricateStock: []});
    }
  })
};
