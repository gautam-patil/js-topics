const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var followupSchema = new Schema({
	enquiryId:{
		type: Schema.Types.ObjectId,
		required: true
	},
	followupDate:{
		type: String
	},
	comment:{
		type: String
	},
	nextFollowupDate:{
		type: String
	},
	followupTime:{
		type: String
	}
});

module.exports = mongoose.model('Followup', followupSchema);