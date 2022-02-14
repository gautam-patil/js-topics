const User = require('./../models/createUser.model');
const Team = require('./../models/createTeam.model');

exports.login = function (req, res) {
	res.render("login/login");
}

exports.loginUser = function (req, res){
	var loginDetail = new User();
	loginDetail.email = req.body.email;
	loginDetail.password = req.body.password;

	User.findOne( { $and: [ { email: loginDetail.email }, { password: loginDetail.password } ] } , function (err, isUserExist){
            if(err) {
                console.log(err);
            }
            if (isUserExist) {

                Team.findOne( { empId: loginDetail.password } , function (err, isUserExist){ 

                })

            	req.session.userData = isUserExist;
                req.session.userId = isUserExist._id;

            	res.redirect('/dashboard');            	
            }else{
            	res.redirect('/');
            }

    })
}

exports.logout = function (req, res){
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
}