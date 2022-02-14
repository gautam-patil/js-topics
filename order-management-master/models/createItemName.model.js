const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itemNameSchema = new Schema({
	
	itemGroupId:{
		type: Schema.Types.ObjectId,
	},

	itemName:{
		type: String,
	},

	subItemName:{
		type: String,
	},

	aboutItem:{

		type: String,
	},
	
	groupNameId:{
		type: Schema.Types.ObjectId,
	},

	colourId:{
		type: Schema.Types.ObjectId,
	},

	sizeId:{
		type: Schema.Types.ObjectId,
	},

	opening:{

		type: Number,
	},
	rate:{

		type: Number,
	},
	sqFt:{

		type: Number,
	},
	minimumQuantity:{

		type: Number,
	},
	unit:{

		type: String,
	},
	thick:{

		type: String,
	},
	size:{

		type: Number,
	},
	regular:{

		type: String,
	},
	fabrication:{

		type: String,
	},
	quantitySqft:{

		type: Number,
	},

});

module.exports = mongoose.model('ItemName', itemNameSchema);