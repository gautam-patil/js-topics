const CashEntry = require('./../models/createCashEntry.model');
const Enquiry = require('./../models/createEnquiry.model');
const CashBankBook = require('./../models/createCashBankBook.model');
const PurchaseParty = require('./../models/createPurchaseParty.model');
const mongoose = require('mongoose');

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

exports.viewEnquiryLedger = function (req, res) {    

    if (req.session.userData) {
    Enquiry.findOne({ _id:req.params.id}, function (err, enquiryData){
            if(err) {
                console.log(err);
            }else{    
                console.log(req.params.id);
                username = req.session.userData;
                res.render("ledger/viewEnquiryLedger", { enquiry: enquiryData, username: username})
            }
    });
     }else{
        res.redirect("/");
    }
}

exports.searchEnquiryLedger = function (req, res) {

    var Id = mongoose.Types.ObjectId(req.params.id);  

  CashEntry.aggregate([

    {
      $match : { $and: [ {partyId: Id}, {date: {$gte: (req.body.firstDate), $lt: (req.body.secondDate)}} ]}
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
              foreignField: "billId",
              as: "stock"
          }
    },
    {
      $lookup:
          {
              from: "cashbankbooks",
              localField: "cashBankBookId",
              foreignField: "_id",
              as: "cashbook"
          }
    },
    {
        $sort : { 'date': 1 }
    },

  ]).then(function(allLedgerBook) {

    if(allLedgerBook) {
        res.json({msg:'success',ledger:allLedgerBook});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};


exports.viewPurchaseLedger = function (req, res) {    

    if (req.session.userData) {
    PurchaseParty.findOne({ _id:req.params.id}, function (err, purchaseData){
            if(err) {
                console.log(err);
            }else{    
                console.log(req.params.id);
                username = req.session.userData;
                res.render("ledger/viewPurchaseLedger", { purchase: purchaseData, username: username})
            }
    });
     }else{
        res.redirect("/");
    }
}

exports.searchPurchaseLedger = function (req, res) {

    var Id = mongoose.Types.ObjectId(req.params.id);  

  CashEntry.aggregate([

    {
      $match : { $and: [ {partyId: Id}, {date: {$gte: (req.body.firstDate), $lt: (req.body.secondDate)}} ]}
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
    {
      $lookup:
          {
              from: "cashbankbooks",
              localField: "cashBankBookId",
              foreignField: "_id",
              as: "cashbook"
          }
    },

  ]).then(function(allLedgerBook) {

    if(allLedgerBook) {
        console.log(allLedgerBook)
        res.json({msg:'success',ledger:allLedgerBook});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};

exports.debtorLedger = function (req, res) {

    var Id = mongoose.Types.ObjectId(req.body.partyId);  

  CashEntry.aggregate([

    {
      $match : { $and: [ {partyId: Id}, {date: {$gte: (req.body.openingDate), $lt: (today)}} ]}
    },
    {
      $lookup:
          {
              from: "stocks",
              localField: "_id",
              foreignField: "billId",
              as: "stock"
          }
    },

  ]).then(function(allLedgerBook) {

    if(allLedgerBook) {
        res.json({msg:'success',ledger:allLedgerBook});
    }else{
        res.json({msg:'success',purchaseStock: []});
    }
  })
};