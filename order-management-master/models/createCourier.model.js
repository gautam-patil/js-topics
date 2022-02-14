const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var courierSchema = new Schema({
	
	requestDate:{
		type:String
	},

	requestUserId:{
		type: Schema.Types.ObjectId,
	},

	partyId:{
		type: Schema.Types.ObjectId,
	},
	
	itemDetail:{
		type:String
	},

	requestComment:{
		type:String
	},

	role:{
		type: Number,
	},

	confirmUserId:{
		type: Schema.Types.ObjectId,
	},

	confirmDate:{
		type: String,
	},

	confirmComment:{
		type:String
	},

	sendUserId:{
		type: Schema.Types.ObjectId,
	},

	sendDate:{
		type: String,
	},

	sendComment:{
		type:String
	},	

	courierName:{
		type:String
	},	

	docNo:{
		type:String
	},	

	unit:{
		type:String
	},	

	amount:{
		type:Number
	},	

	weightQuantity:{
		type:Number
	},	

	recieveUserId:{
		type: Schema.Types.ObjectId,
	},

	recieveDate:{
		type: String,
	},

	recieveComment:{
		type:String
	},	

});

module.exports = mongoose.model('Courier', courierSchema);