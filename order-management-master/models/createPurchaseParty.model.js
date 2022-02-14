const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var purchasePartySchema = new Schema({
	name:{
		type: String
	},
});

module.exports = mongoose.model('PurchaseParty', purchasePartySchema);