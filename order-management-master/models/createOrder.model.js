const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderSchema = new Schema({
	bookDate:{
		type: String
	},
	bookUserId:{
		type: Schema.Types.ObjectId,
	},
	pendingDate:{
		type: String
	},
	pendingUserId:{
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
		required: true
	},
	orderNo:{
		type: String
	},
	transport:{
		type: String
	},
	transportName:{
		type: String
	},
	transportNumber:{
		type: Number
	},
	packing:{
		type: String
	},
	packingDetail:{
		type: String
	},
	dispatchDate:{
		type: String
	},
	dispatchUrgentBO:{
		type: String
	},
	fpDispatchBO:{
		type: Number
	},
	dispatchUrgentCO:{
		type: String
	},
	fpDispatchCO:{
		type: Number
	},
	fabricateDate:{
		type: String
	},
	fabricateUrgent:{
		type: String
	},
	fpFabricate:{
		type: Number
	},
	hardware:{
		type: String
	},
	fitting:{
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
	commentBO:{
		type: String
	},
	commentCO:{
		type: String
	},
	role:{
		type: Number
	},
	fabricateDone:{
		type: Number
	},
	fabricateUserId:{
		type: Schema.Types.ObjectId,
	},
	fabricateDoneDate:{
		type: String
	},
	fabricateDoneTime:{
		type: String
	},
	fabricateComment:{
		type: String
	},
	checkDone:{
		type: Number
	},
	checkUserId:{
		type: Schema.Types.ObjectId,
	},
	checkDoneDate:{
		type: String
	},
	checkDoneTime:{
		type: String
	},
	checkComment:{
		type: String
	},
	dispatchDone:{
		type: Number
	},
	dispatchUserId:{
		type: Schema.Types.ObjectId,
	},
	dispatchDoneDate:{
		type: String
	},
	dispatchDoneTime:{
		type: String
	},
	dispatchTransportName:{
		type: Schema.Types.ObjectId,
	},
	dispatchComment:{
		type: String
	},
	
	billId:{
		type: Schema.Types.ObjectId,
	},
	billDone:{
		type: Number,
	},
});

module.exports = mongoose.model('Order', orderSchema);