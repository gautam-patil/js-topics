const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var enquirySchema = new Schema({
	enquiryDate:{
		type: String
	},
	marketingPerson:{
		type: Schema.Types.ObjectId,
	},
	refrenceBy:{
		type: String
	},
	shopName:{
		type: String
	},
	enquiryStatus:{
		type: String
	},
	shopType:{
		type: String
	},
	category:{
		type: String
	},
	gstNo:{
		type: String
	},
	mobile:{
		type: Number
	},
	textMobile:{
		type: String
	},
	email:{
		type: String
	},
	state:{
		type: String
	},
	city:{
		type: String
	},
	address:{
		type: String
	},
	firstContactPersonName:{
		type: String
	},
	firstContactPersonMobile:{
		type: Number
	},
	secondContactPersonName:{
		type: String
	},
	secondContactPersonMobile:{
		type: Number
	},
	requirement:{
		type: String
	},
	currentWorking:{
		type: String
	},
	transportName:{
		type: String
	},
	transportNumber:{
		type: Number
	},
	interestedItem1:{
		type: Number
	},
	interestedItem2:{
		type: Number
	},
	interestedItem3:{
		type: Number
	},
	interestedItem4:{
		type: Number
	},
	interestedItem5:{
		type: Number
	},
	interestedItem6:{
		type: Number
	},
	interestedItem7:{
		type: Number
	},
	interestedItem8:{
		type: Number
	},
	openingAmount:{
		type: Number
	},
	openingDate:{
		type: String
	},
	softOpening:{
		type: Number
	},
	softDate:{
		type: String
	},
});

module.exports = mongoose.model('Enquiry', enquirySchema);