const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var petrolReadingSchema = new Schema({
	
	date:{
		type:String
	},

	startReadingUserId:{
		type: Schema.Types.ObjectId,
	},

	empId:{
		type: Schema.Types.ObjectId,
	},

	startReading:{
		type: Number,
	},	

	lastReadingUserId:{
		type: Schema.Types.ObjectId,
	},

	lastReading:{
		type: Number,
	},	

	placeVisit:{
		type: String,
	},	

	role:{
		type: Number,
	},	

});

module.exports = mongoose.model('PetrolReading', petrolReadingSchema);