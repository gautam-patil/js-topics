const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var quotationSchema = new Schema({
	
	userId:{
		type: Schema.Types.ObjectId,
	},

	partyId:{
		type: Schema.Types.ObjectId,
	},

	date:{
		type: String,
	},

	quotationImage:{
		type: String,
	},

	role:{
		type: Number,
	},

});

module.exports = mongoose.model('Quotation', quotationSchema);