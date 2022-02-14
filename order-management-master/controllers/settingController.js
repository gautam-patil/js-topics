const Colour = require('./../models/createColour.model');
const Size = require('./../models/createSize.model');
const GroupName = require('./../models/createGroupName.model');
const CashBankBook = require('./../models/createCashBankBook.model');

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


exports.colour = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("setting/colour", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.createColour = function (req, res) {

    var createColour = new Colour();
    createColour.colourName = req.body.colourName;
    createColour.save((err, doc) => {
        if (!err)
            res.json({msg:'success'});
        else {

            console.log(err);
        }
    });
}

exports.allColour = function (req, res){

    Colour.find({}, function (err, allColour){
            if(err) {
                console.log(err);
            }else{
                res.json({msg:'success',colour:allColour});
            }
    });
}

exports.size = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("setting/size", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.createSize = function (req, res) {
  
    var createSize = new Size();
    createSize.size = req.body.size;
    createSize.save((err, doc) => {
        if (!err)
            res.json({msg:'success'});
        else {

            console.log(err);
        }
    });
}

exports.allSize = function (req, res){

    Size.find({}, function (err, allSize){
            if(err) {
                console.log(err);
            }else{
                res.json({msg:'success',size:allSize});
            }
    });
}

exports.cashBankBook = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("setting/cashBankBook", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.createCashBankBook = function (req, res) {
  
    var createCashBankBook = new CashBankBook();
    createCashBankBook.name = req.body.cashBankBook;
    createCashBankBook.about = req.body.about;
    createCashBankBook.role = 1;
    createCashBankBook.save((err, doc) => {
        if (!err)
            res.json({msg:'success'});
        else {

            console.log(err);
        }
    });
}

exports.allCashBankBook = function (req, res){

    CashBankBook.find({ role: 1}, function (err, allCashBankBook){
            if(err) {
                console.log(err);
            }else{
                res.json({msg:'success',cashBankBook:allCashBankBook});
            }
    });
}

exports.expenseList = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("setting/expense", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.createExpenseList = function (req, res) {
  
    var createExpense = new CashBankBook();
    createExpense.name = req.body.expense;
    createExpense.about = req.body.about;
    createExpense.role = 2;
    createExpense.save((err, doc) => {
        if (!err)
            res.json({msg:'success'});
        else {

            console.log(err);
        }
    });
}

exports.allExpenseList = function (req, res){

    CashBankBook.find({ role: 2 }, function (err, allExpense){
            if(err) {
                console.log(err);
            }else{
                res.json({msg:'success',expense:allExpense});
            }
    });
}

exports.loanList = function (req, res) {
    if (req.session.userData) {

        username = req.session.userData;
        res.render("setting/loan", {username: username});
    }else{
        res.redirect("/");
    }
}

exports.createLoanList = function (req, res) {
  
    var createLoan = new CashBankBook();
    createLoan.name = req.body.loan;
    createLoan.about = req.body.about;
    createLoan.role = 3;
    createLoan.save((err, doc) => {
        if (!err)
            res.json({msg:'success'});
        else {

            console.log(err);
        }
    });
}

exports.allLoanList = function (req, res){

    CashBankBook.find({ role: 3 }, function (err, allLoan){
            if(err) {
                console.log(err);
            }else{
                res.json({msg:'success',loan:allLoan});
            }
    });
}

//Group[----------------------]
exports.allGroupList = function (req, res){

    GroupName.find({ }, function (err, allGroup){
            if(err) {
                console.log(err);
            }else{
                res.json({msg:'success',group:allGroup});
            }
    });
}
