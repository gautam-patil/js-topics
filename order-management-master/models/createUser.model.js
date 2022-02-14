const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
	
	joiningDate:{
		type: Date
	},
	name:{
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	FHName:{
		type: String
	},
	dob:{
		type: String
	},
	contactNo:{
		type: String
	},
	whatsappContactNo:{
		type: String
	},
	localAddress:{
		type: String
	},
	permanentAddress:{
		type: String
	},
	designation:{
		type: String
	},
	workStatus:{
		type: String
	},
	salary:{
		type: Number
	},
	pl:{
		type: Number
	},
	bloodGroup:{
		type: String
	},
	adharNo:{
		type: Number
	},
	votorNo:{
		type: String
	},
	panNo:{
		type: String
	},
	drivingLicenseNo:{
		type: String
	},
	pfNo:{
		type: String
	},
	esiInsuranceNo:{
		type: String
	},
	esiUanNo:{
		type: String
	},
	esiMemberId:{
		type: String
	},
	bankName:{
		type: String
	},
	bankAddress:{
		type: String
	},
	bankAccountNo:{
		type: Number
	},
	bankIfscCode:{
		type: String
	},
	reName1:{
		type: String
	},
	re1:{
		type: String
	},
	reMobile1:{
		type: Number
	},
	reName2:{
		type: String
	},
	re2:{
		type: String
	},
	reMobile2:{
		type: Number
	},

	//Role-----
	role: {
		type: Number
	},

	// Enquiry Role----------

	newEnquiryRole: {
		type: Number
	},

	seeAllEnquiryRole: {
		type: Number
	},

	seeMktEnquiryRole: {
		type: Number
	},

	// Courier Role-------------------

	requestCourierRole: {
		type: Number
	},

	requestedCourierRole: {
		type: Number
	},

	sendCourierRole: {
		type: Number
	},

	recieveCourierRole: {
		type: Number
	},

	//Order Role-------------------------
	allOrderRole: {
		type: Number
	},

	bookOrderRole: {
		type: Number
	},

	confirmOrderRole: {
		type: Number
	},

	finalConfirmOrderRole: {
		type: Number
	},

	bookOrderConfirmRole: {
		type: Number
	},

	finalOrderConfirmRole: {
		type: Number
	},

	misReportRole: {
		type: Number
	},

	createSaleBillRole: {
		type: Number
	},

	seeSaleBillRole: {
		type: Number
	},

	fabricateStockRole: {
		type: Number
	},

	//Stock-------------------

	seeAllStockRole: {
		type: Number
	},

	godownOneStockRole: {
		type: Number
	},

	godownThreeStockRole: {
		type: Number
	},

	godownTransferRole: {
		type: Number
	},

	physicalStockRole: {
		type: Number
	},

	tallyStockRole: {
		type: Number
	},

	//Purchase-------------------

	purchaseStockRole: {
		type: Number
	},

	recieveStockRole: {
		type: Number
	},

	// User-----------------
	seeUserRole: {
		type: Number
	},

	managerId:{
		type: Schema.Types.ObjectId,
	},

	teamId:{
		type: Schema.Types.ObjectId,
	},

	department:{
		type: String,
	},

	goal:{
		type: String,
	},

	teamRole:{
		type: Number,
	},

});

module.exports = mongoose.model('User', userSchema);