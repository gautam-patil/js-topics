const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cashBankBookSchema = new Schema({
	
	name:{
		type:String
	},
	about:{
		type: String
	},
	role: {

		type: Number
	}

});

module.exports = mongoose.model('CashBankBook', cashBankBookSchema);