const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cashEntrySchema = new Schema({

	//Sale Bill Role == 1
	//Sale Cash Entry Role == 2
	//Purchase Bill Role == 3
	
	//common
	userId:{
		type: Schema.Types.ObjectId,
	},
	partyId:{
		type: Schema.Types.ObjectId,
	},
	comment:{
		type: String
	},
	role:{
		type: Number
	},
	date:{
		type: String
	},
	
	secondLedger:{
		type: Number
	},
	
	//Bill Role == 1
	
	billNo:{
		type: String
	},
	packingCharge:{
		type: Number
	},
	transportCharge:{
		type: Number
	},
	fittingCharge:{
		type: Number
	},
	gst:{
		type: Number
	},
	discount:{
		type: Number
	},

	receiveDone:{
		type: Number
	},

	receiveComment:{
		type: String
	},

	//Cash Entry Role = 3

	

	cashBankBookId:{
		type: Schema.Types.ObjectId,
	},

	contraCashBankBookId:{
		type: Schema.Types.ObjectId,
	},

	expenseId:{
		type: Schema.Types.ObjectId,
	},

	loanId:{
		type: Schema.Types.ObjectId,
	},

	payRec:{
		type: Number,
	},

	empId:{
		type: Schema.Types.ObjectId,
	},

	amount:{
		type: String,
	},

	

});

module.exports = mongoose.model('CashEntry', cashEntrySchema);