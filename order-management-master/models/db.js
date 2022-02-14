const mongoose = require('mongoose');

mongoose.connect('mongodb://Admin:admin@localhost:27017/MarketingDB?authSource=admin', { useNewUrlParser: true }, (err) =>{
	if (!err) {
		console.log('Database Connection Succeeded') 
	}else{
		console.log(err)
	}

});
// 607d78435b169a92e5080345