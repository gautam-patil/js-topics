const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var taskReviewSchema = new Schema({
	
	date:{
		type:String
	},

	userId:{
		type: Schema.Types.ObjectId,
	},

	cashBankBookId:{
		type: Schema.Types.ObjectId,
	},

	contraCashBankBookId:{
		type: Schema.Types.ObjectId,
	},

	expenseId:{
		type: Schema.Types.ObjectId,
	},

	loanId:{
		type: Schema.Types.ObjectId,
	},

	partyId:{
		type: Schema.Types.ObjectId,
	},

	payRec:{
		type: Number,
	},

	empId:{
		type: Schema.Types.ObjectId,
	},

	amount:{
		type: String,
	},

	comment:{
		type: String,
	},
	role:{
		type: Number,
	},

});

module.exports = mongoose.model('TaskReview', taskReviewSchema);