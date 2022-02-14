const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itemGroupSchema = new Schema({
	
	itemGroupName:{
		type: String,
	},
	aboutItemGroup:{

		type: String,
	},

});

module.exports = mongoose.model('ItemGroup', itemGroupSchema);