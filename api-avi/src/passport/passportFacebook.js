const passport = require("passport");
const {User} = require("../models");
const FacebookStrategy = require("passport-facebook").Strategy


passport.use(new FacebookStrategy({
    clientID:process.env.NODE_ENV==="development"?process.env.FACEBOOK_CLIENT_ID_DEV: process.env.FACEBOOK_CLIENT_ID_PROD ,
      clientSecret:process.env.NODE_ENV==="development"?process.env.FACEBOOK_CLIENT_SECRET_DEV:process.env.FACEBOOK_CLIENT_SECRET_PROD ,
      profileFields: ['id', 'emails', 'name','gender'] ,
      callbackURL:process.env.NODE_ENV==="development"?process.env.FACEBOOK_CALLBACK_URL_DEV: process.env.FACEBOOK_CALLBACK_URL_PROD,
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log(profile);
      User.findOne({ provider: "facebook", uid: profile.id }, (err, user) => {
        if (err) {
          console.log(err);

          return done(err);
        }

        if (user) {
          return done(null, user);
        }
         else {
           User.findOneAndUpdate({email:profile._json.email},{
             provider: "facebook",
           uid: profile._json.id},{new: true,runValidators:true}).then((user) => {
             if(user){
            return done(null, user);
          }
            else{
              User.create({
                email:profile._json.email,
                first_name:profile._json.first_name,
                last_name:profile._json.last_name,
                provider: "facebook",
                uid: profile._json.id,
                isCreatedBySocialLogin:true
              })
                .then((user) => {
                  return done(null, user);
                })
                .catch((err) => {
                  return done(err);
                });
            }
          })
          
       
          }
      });
  }
));