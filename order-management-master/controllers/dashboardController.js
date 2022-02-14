const User = require('./../models/createUser.model');

exports.dashboard = function (req, res){

	if (req.session.userData) {

		username = req.session.userData;
		role = req.session.userRole;
		id = req.session.userId;

		res.render("dashboard/index", {username: username, role:role, id:id});
	}else{
		res.redirect("/");
	}

}

// today Dashboard
exports.todayDashboard = function (req, res){

	if (req.session.userData) {

		username = req.session.userData;
		role = req.session.userRole;
		id = req.session.userId;

		res.render("dashboard/todayDashboard", {username: username, role:role, id:id});
	}else{
		res.redirect("/");
	}

}

exports.dealerDashboard = function (req, res){

	if (req.session.userData) {

		username = req.session.userData;
		role = req.session.userRole;
		id = req.session.userId;

		res.render("dashboard/dealerDashboard", {username: username, role:role, id:id});
	}else{
		res.redirect("/");
	}

}

exports.userDashboard = function (req, res){

	if (req.session.userData) {

		username = req.session.userData;
		role = req.session.userRole;
		id = req.session.userId;

		userId = req.params.id; 

		User.findOne({ _id:req.params.id}, function (err, userData){
            if(err) {
                console.log(err);
            }else{
				res.render("dashboard/userDashboard", {username: username, role:role, id:id, userId:userId, userData:userData});
            }
        });

	}else{
		res.redirect("/");
	}

}
