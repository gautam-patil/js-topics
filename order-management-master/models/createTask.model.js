const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var taskSchema = new Schema({
	
	empId:{
		type: Schema.Types.ObjectId,
	},

	memberId:{
		type: Schema.Types.ObjectId,
	},

	task:{
		type: String,
	},

	role:{
		type: Number,
	},

});

module.exports = mongoose.model('Task', taskSchema);