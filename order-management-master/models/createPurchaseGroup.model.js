const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var purchaseGroupSchema = new Schema({
	bookDate:{
		type: String
	},
	bookUserId:{
		type: Schema.Types.ObjectId,
	},
	confirmDate:{
		type: String
	},
	confirmUserId:{
		type: Schema.Types.ObjectId,
	},
	partyId:{
		type: Schema.Types.ObjectId,
	},
	purchaseBookingNo:{
		type: String
	},
	comment:{
		type: String
	},
	invoiceNo:{
		type: String
	},
	role:{
		type: Number
	}
});

module.exports = mongoose.model('PurchaseGroup', purchaseGroupSchema);