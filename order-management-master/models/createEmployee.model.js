const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var employeeDataSchema = new Schema({
	joiningDate:{
		type: Date
	},
	name:{
		type: String
	},
	fatherName:{
		type: String
	},
	dob:{
		type: Date
	},
	contactNo1:{
		type: String
	},
	contactNo2:{
		type: String
	},
	whatsappNo1:{
		type: String
	},
	whatsappNo1:{
		type: String
	},
	otherPersonName:{
		type: String
	},
	otherPersonContactNo:{
		type: String
	},
	localAddress:{
		type: String
	},
	permanentAddress:{
		type: String
	},
	group:{
		type: String
	},
	designation:{
		type: String
	},
	workStatus:{
		type: String
	},
	basic:{
		type: Number
	},
	hra:{
		type: Number
	},
	convince:{
		type: Number
	},
	rent:{
		type: Number
	},
	pf:{
		type: Number
	},
	esi:{
		type: Number
	},
	gross:{
		type: Number
	},
	pl:{
		type: Number
	},
	bloodGroup:{
		type: String
	},
	adharCard:{
		type: String
	},
	voterCard:{
		type: String
	},
	panCard:{
		type: String
	},
	drivingLicence:{
		type: String
	},
	pfAccountNo:{
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
	bankAdress:{
		type: String
	},
	accountNo:{
		type: Number
	},
	ifscCode:{
		type: String
	},
});

module.exports = mongoose.model('EmployeeData', employeeDataSchema);