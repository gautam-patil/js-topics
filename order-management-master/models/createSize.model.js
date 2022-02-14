const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sizeSchema = new Schema({
	
	size:{
		type:String
	},

});

module.exports = mongoose.model('Size', sizeSchema);