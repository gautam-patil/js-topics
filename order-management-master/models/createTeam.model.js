const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var teamSchema = new Schema({
	
	empId:{
		type: Schema.Types.ObjectId,
	},

	managerId:{
		type: Schema.Types.ObjectId,
	},

	teamId:{
		type: Schema.Types.ObjectId,
	},

	department:{
		type:String
	},

	goal:{
		type: String,
	},
	role:{
		type: Number,
	},

});

module.exports = mongoose.model('Team', teamSchema);