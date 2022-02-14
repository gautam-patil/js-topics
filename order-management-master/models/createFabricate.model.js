const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var fabricateSchema = new Schema({
	
	fabricateDate:{
		type: String
	},
	userId:{
		type: Schema.Types.ObjectId,
	},
	orderId:{	
		type: Schema.Types.ObjectId,
	},
	fabricateItemId:{
		type: Schema.Types.ObjectId,
	},
	comment:{
		type: String,
	},
	roundOff:{
		type: Number,
	},
	roundOffFab:{
		type: Number,
	},
});

module.exports = mongoose.model('Fabricate', fabricateSchema);