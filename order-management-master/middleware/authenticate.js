const Authenticate = async (req, res, next) => {

	try{

		if(!req.session.userData){

			throw new Error("not found");
		}

		next();
	
	} catch (err) {

		res.redirect("/");
	}

};

module.exports = Authenticate;