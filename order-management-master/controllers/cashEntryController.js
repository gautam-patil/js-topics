const CashEntry = require('./../models/createCashEntry.model');
const Order = require('./../models/createOrder.model');
const Stock = require('./../models/createStock.model');

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

//Sale Bill
exports.createSaleBill = function (req, res){

  console.log(req.body);

  if (req.body.orderId[0] != "Select Item Group") {


  var createBO = new CashEntry();
    createBO.date = today;
    createBO.userId = req.session.userId;
    createBO.partyId = req.body.partyId;
    createBO.billNo = req.body.billNo;
    
    if (req.body.secondLedger) {

      createBO.secondLedger = req.body.secondLedger;
    }else{

      createBO.secondLedger = 0;
    }
    createBO.packingCharge = req.body.packingCharge;
    createBO.transportCharge = req.body.transportCharge;
    createBO.fittingCharge = req.body.fittingCharge;
    createBO.gst = req.body.gst;
    createBO.discount = req.body.discount;
    createBO.comment = req.body.comment;
    createBO.role = 1;

    createBO.save((err, doc) => {

      for (var i = 0; i <= req.body.totalOrder; i++) {

        if (req.body.orderId[i]) {

          var Id = mongoose.Types.ObjectId(req.body.orderId[i]);  

          Order.findOneAndUpdate({ _id: Id}, { $set: { "billId": createBO._id, "billDone" : 1 }}, function(err, update){
            if(err) {
                console.log(err);
            }else{

                console.log('done');
            }
          });

        }else{
          
          console.log('Item Not recieved');          
        }
      }
      for (var i = 0; i <= req.body.totalStock; i++) {

        if (req.body.stockId[i]) {

          var Id = mongoose.Types.ObjectId(req.body.stockId[i]);  

          Stock.findOneAndUpdate({ _id: Id}, { $set: { "billId": createBO._id }}, function(err, update){
            if(err) {
                console.log(err);
            }else{

                console.log('stock done');
            }
          });

        }else{
          
          console.log('Item Not recieved');          
        }
      }

      res.redirect('/create-sale-bill-page');
    });
  }else{

    console.log('Order Not recieved');
    res.redirect('/create-sale-bill-page');
  }
}

exports.addBillOrder = function (req, res){

  console.log(req.body);

      var Id = mongoose.Types.ObjectId(req.body.orderId);  

      Order.findOneAndUpdate({ _id: Id}, { $set: { "billId": req.body.billId, "billDone" : 1 }}, function(err, update){
        if(err) {
            console.log(err);
        }else{

            Stock.updateMany({ foreginId: update._id}, { $set: { "billId": req.body.billId }}, function(err, update){
                if(err) {
                    console.log(err);
                }else{

                    console.log('stock done');
                    res.json({msg:'success'});
                }
            });
        }
      });

}

exports.removeBillOrder = function (req, res){

  console.log(req.body);

      var Id = mongoose.Types.ObjectId(req.body.orderId);  

      Order.findOneAndUpdate({ _id: Id}, { $unset: { "billId": "" },$set: { "billDone" : 0 }},  function(err, update){
        if(err) {
            console.log(err);
        }else{

            res.json({msg:'success'});
        }
      });


}

exports.updateSaleBill = function (req, res) {

  var Id = mongoose.Types.ObjectId(req.params.id);  

  CashEntry.findOneAndUpdate({ _id: Id}, { $set: req.body}, function(err, update){
      if(err) {
          console.log(err);
      }else{

          res.json({msg:'success'});
      }
  });

  
}

//End Sale Bill


exports.addCashEntry = function (req, res){

    console.log(req.body);
        

        let createCashEntry = new CashEntry();
          createCashEntry.date = req.body.date;
          createCashEntry.userId = req.session.userId;
          createCashEntry.cashBankBookId = req.body.cashBankBookId;
          createCashEntry.contraCashBankBookId = req.body.contraCashBankBookId;
          createCashEntry.expenseId = req.body.expenseId;
          createCashEntry.loanId = req.body.loanId;
          createCashEntry.partyId = req.body.partyId;
          createCashEntry.payRec = req.body.payRec;
          createCashEntry.empId = req.body.empId;
          createCashEntry.amount = req.body.amount;
          createCashEntry.comment = req.body.comment;
          createCashEntry.secondLedger = req.body.secondLedger;
          createCashEntry.role = req.body.role;

          createCashEntry.save((err, doc) => { 

          })
      
    
      res.json({msg:'success'});
}

exports.salaryAdvance = function (req, res) {

    if (req.session.userData) {

        username = req.session.userData;
        res.render("cashEntry/salaryAdvance", {username: username});
    }else{
        res.redirect("/");
    }
}


exports.searchSalaryAdvance = function (req, res) {

    var condition = [];
    var firstDate = req.body.firstDate;
    var secondDate = req.body.secondDate;
    var empId = req.body.empId;

    console.log(req.body);

    if (firstDate && secondDate) {

        condition.push({date: {$gte: firstDate, $lt: secondDate}});
    }

    if (empId) {

        var Id = mongoose.Types.ObjectId(empId);
        condition.push({empId: Id});
    }

    condition.push({role: 1});


    CashEntry.aggregate(
        [
        {$match : { $and: condition }},

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
                        from: "users",
                        localField: "empId",
                        foreignField: "_id",
                        as: "emp"
                    }
            },
            {
                $lookup:
                    {
                        from: "cashbankbooks",
                        localField: "cashBankBookId",
                        foreignField: "_id",
                        as: "cashBankBook"
                    }
            },      
            

                ]).then(function(allCashEntry) {
        
            if(allCashEntry) {
              console.log(allCashEntry);
                res.json({msg:'success',cashEntry:allCashEntry});
            }else{
                res.json({msg:'success',cashEntry: []});
            }
    });
}

exports.contra = function (req, res) {

    if (req.session.userData) {

        username = req.session.userData;
        res.render("cashEntry/contra", {username: username});
    }else{
        res.redirect("/");
    }
}


exports.searchContra = function (req, res) {

    var condition = [];
    var firstDate = req.body.firstDate;
    var secondDate = req.body.secondDate;

    console.log(req.body);

    if (firstDate && secondDate) {

        condition.push({date: {$gte: firstDate, $lt: secondDate}});
    }

    condition.push({role: 2});


    CashEntry.aggregate(
        [
        {$match : { $and: condition }},

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
                      from: "cashbankbooks",
                      localField: "cashBankBookId",
                      foreignField: "_id",
                      as: "cashBankBook"
                  }
          },      
          {
              $lookup:
                  {
                      from: "cashbankbooks",
                      localField: "contraCashBankBookId",
                      foreignField: "_id",
                      as: "contraCashBankBook"
                  }
          },      
            

                ]).then(function(allCashEntry) {
        
            if(allCashEntry) {
              console.log(allCashEntry);
                res.json({msg:'success',cashEntry:allCashEntry});
            }else{
                res.json({msg:'success',cashEntry: []});
            }
    });
}

exports.expense = function (req, res) {

    if (req.session.userData) {

        username = req.session.userData;
        res.render("cashEntry/expense", {username: username});
    }else{
        res.redirect("/");
    }
}


exports.searchExpense = function (req, res) {

    var condition = [];
    var firstDate = req.body.firstDate;
    var secondDate = req.body.secondDate;

    console.log(req.body);

    if (firstDate && secondDate) {

        condition.push({date: {$gte: firstDate, $lt: secondDate}});
    }

    condition.push({role: 3});


    CashEntry.aggregate(
        [
        {$match : { $and: condition }},

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
                      from: "cashbankbooks",
                      localField: "cashBankBookId",
                      foreignField: "_id",
                      as: "cashBankBook"
                  }
          },      
          {
              $lookup:
                  {
                      from: "cashbankbooks",
                      localField: "expenseId",
                      foreignField: "_id",
                      as: "expense"
                  }
          },      
            

                ]).then(function(allCashEntry) {
        
            if(allCashEntry) {
              console.log(allCashEntry);
                res.json({msg:'success',cashEntry:allCashEntry});
            }else{
                res.json({msg:'success',cashEntry: []});
            }
    });
}

exports.loan = function (req, res) {

    if (req.session.userData) {

        username = req.session.userData;
        res.render("cashEntry/loan", {username: username});
    }else{
        res.redirect("/");
    }
}


exports.searchLoan = function (req, res) {

    var condition = [];
    var firstDate = req.body.firstDate;
    var secondDate = req.body.secondDate;

    console.log(req.body);

    if (firstDate && secondDate) {

        condition.push({date: {$gte: firstDate, $lt: secondDate}});
    }

    condition.push({role: 4});


    CashEntry.aggregate(
        [
        {$match : { $and: condition }},

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
                      from: "cashbankbooks",
                      localField: "cashBankBookId",
                      foreignField: "_id",
                      as: "cashBankBook"
                  }
          },      
          {
              $lookup:
                  {
                      from: "cashbankbooks",
                      localField: "laonId",
                      foreignField: "_id",
                      as: "loan"
                  }
          },      
            

                ]).then(function(allCashEntry) {
        
            if(allCashEntry) {
              console.log(allCashEntry);
                res.json({msg:'success',cashEntry:allCashEntry});
            }else{
                res.json({msg:'success',cashEntry: []});
            }
    });
}

exports.purchaseCashEntry = function (req, res) {

    if (req.session.userData) {

        username = req.session.userData;
        res.render("cashEntry/purchaseCashEntry", {username: username});
    }else{
        res.redirect("/");
    }
}


exports.searchPurchaseCashEntry = function (req, res) {

    var condition = [];
    var firstDate = req.body.firstDate;
    var secondDate = req.body.secondDate;

    console.log(req.body);

    if (firstDate && secondDate) {

        condition.push({date: {$gte: firstDate, $lt: secondDate}});
    }

    condition.push({role: 5});


    CashEntry.aggregate(
        [
        {$match : { $and: condition }},

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
                      from: "cashbankbooks",
                      localField: "cashBankBookId",
                      foreignField: "_id",
                      as: "cashBankBook"
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
            

                ]).then(function(allCashEntry) {
        
            if(allCashEntry) {
              console.log(allCashEntry);
                res.json({msg:'success',cashEntry:allCashEntry});
            }else{
                res.json({msg:'success',cashEntry: []});
            }
    });
}

exports.saleCashEntry = function (req, res) {

    if (req.session.userData) {

        username = req.session.userData;
        res.render("cashEntry/saleCashEntry", {username: username});
    }else{
        res.redirect("/");
    }
}


exports.searchSaleCashEntry = function (req, res) {

    var condition = [];
    var firstDate = req.body.firstDate;
    var secondDate = req.body.secondDate;

    console.log(req.body);

    if (firstDate && secondDate) {

        condition.push({date: {$gte: firstDate, $lt: secondDate}});
    }

    condition.push({role: 2});


    CashEntry.aggregate(
        [
        {$match : { $and: condition }},

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
                      from: "cashbankbooks",
                      localField: "cashBankBookId",
                      foreignField: "_id",
                      as: "cashBankBook"
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
            

                ]).then(function(allCashEntry) {
        
            if(allCashEntry) {
              console.log(allCashEntry);
                res.json({msg:'success',cashEntry:allCashEntry});
            }else{
                res.json({msg:'success',cashEntry: []});
            }
    });
}

exports.deleteCashEntry = function (req, res) {


    console.log(req.body);
    var Id = mongoose.Types.ObjectId(req.body.Id);  

    CashEntry.findOneAndDelete({ _id: Id }, function(err, update){
        if(err) {
            console.log(err);
        }else{

            res.json({msg:'success'});
        }
    });
    

}