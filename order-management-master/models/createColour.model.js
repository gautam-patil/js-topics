const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var colourSchema = new Schema({
	
	colourName:{
		type:String
	},

});

module.exports = mongoose.model('Colour', colourSchema);