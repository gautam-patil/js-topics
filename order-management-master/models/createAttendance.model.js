const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var attendanceSchema = new Schema({
	
	date:{
		type:String
	},

	userId:{
		type: Schema.Types.ObjectId,
	},

	empId:{
		type: Schema.Types.ObjectId,
	},
	attendance:{
		type: String,
	},
	inTime:{
		type: String,
	},
	outTime:{
		type: String,
	},
	remark:{
		type: String,
	},

});

module.exports = mongoose.model('Attendance', attendanceSchema);