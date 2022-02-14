const PurchaseParty = require('./../models/createPurchaseParty.model');

exports.addPurchaseParty = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("purchaseParty/addPurchaseParty");
  } else {
    res.redirect("/");
  }
};

exports.seePurchaseParty = function (req, res) {
  if (req.session.userData) {
    username = req.session.userData;
    role = req.session.userRole;
    id = req.session.userId;

    username = req.session.userData;
    res.render("purchaseParty/seePurchaseParty");
  } else {
    res.redirect("/");
  }
};

exports.createPurchaseParty = function (req, res){

  var createPurchaseParty = new PurchaseParty();
    createPurchaseParty.name = req.body.name;

    createPurchaseParty.save((err, doc) => {
      res.json({msg:'success'});  
    });
}

// exports.createItemGroup = function (req, res){

//   var createItemGroup = new ItemGroup();
//     createItemGroup.itemGroupName = req.body.itemGroupName;
//     createItemGroup.aboutItemGroup = req.body.aboutItemGroup;

//     createItemGroup.save((err, doc) => {
//       res.json({msg:'success'});  
//     });
// }

exports.allPurchaseParty = function (req, res) {
  PurchaseParty.find({}, function (err, allPurchaseParty) {
    if (err) {
      console.log(err);
    } else {
      res.json({ msg: "success", purchaseParty: allPurchaseParty });
    }
  });
};

// exports.allItemName = function (req, res) {

//   const itemGroupId = req.params.id;

//   ItemName.find({ itemGroupId: itemGroupId}, function (err, allItemName) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json({ msg: "success", itemName: allItemName });
//     }
//   });
// };

// exports.createItemName = function (req, res){

//   var createItemName = new ItemName();
//     createItemName.itemGroupId = req.body.itemGroupId;
//     createItemName.itemName = req.body.itemName;
//     createItemName.aboutItem = req.body.aboutItem;
//     createItemName.opening = req.body.opening;
//     createItemName.rate = req.body.rate;
//     createItemName.sqFt = req.body.sqFt;
//     createItemName.minimumQuantity = req.body.minimumQuantity;
//     createItemName.unit = req.body.unit;

//     createItemName.save((err, doc) => {
//       res.json({msg:'success'});  
//     });
// }