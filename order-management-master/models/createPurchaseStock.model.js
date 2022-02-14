const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var purchaseStockSchema = new Schema({
	
	userId:{
		type: Schema.Types.ObjectId,
	},
	date:{
		type: String
	},
	receiveBy:{
		type: Schema.Types.ObjectId,
	},
	receiveDate:{
		type: String,
	},
	confirmBy:{
		type: Schema.Types.ObjectId,
	},
	confirmDate:{
		type: String,
	},
	purchasePartyId:{
		type: Schema.Types.ObjectId,
	},
	invoiceNo:{
		type: String,
	},
	role:{
		type: Number,
	},

});

module.exports = mongoose.model('PurchaseStock', purchaseStockSchema);