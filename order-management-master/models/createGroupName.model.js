const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var groupNameSchema = new Schema({
	
	groupName:{
		type:String
	},
	about:{
		type:String
	},

});

module.exports = mongoose.model('GroupName', groupNameSchema);