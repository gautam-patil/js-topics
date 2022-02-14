const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var stockSchema = new Schema({

	//Role == 1 Purchase stock
	//Role == 2 Recieve stock
	//Role == 3 book stock
	//Role == 4 confirm stock
	//Role == 5 final confirm stock
	//Role == 6 used stock
	//Role == 7 fabricate stock
	//Role == 8 Godown transfer
	
	date:{
		type:String
	},

	foreginId:{
		type: Schema.Types.ObjectId,
	},

	userId:{
		type: Schema.Types.ObjectId,
	},

	itemGroupId:{
		type: Schema.Types.ObjectId,
	},
	itemId:{
		type: Schema.Types.ObjectId,
	},
	billId:{
		type: Schema.Types.ObjectId,
	},
	size:{
		type: String,
	},
	rate:{
		type: Number,
	},
	quantity:{
		type: Number,
	},
	totalSqft:{
		type: Number,
	},
	comment:{
		type: String,
	},
	receiveBy:{
		type: Schema.Types.ObjectId,
	},
	receiveDate:{
		type: String,
	},
	receiveQuantity:{
		type: Number,
	},
	fabricateRole:{
		type: Number,
	},
	godownNo:{
		type: Number,
	},
	byGodownNo:{
		type: Number,
	},
	toGodownNo:{
		type: Number,
	},
	purchaseBookingNo:{
		type: String,
	},
	fabricateRole:{
		type: Number,
	},
	role:{
		type: Number,
	}

});

module.exports = mongoose.model('Stock', stockSchema);