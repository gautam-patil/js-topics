const passport = require("passport");
const {User} = require("../models");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.NODE_ENV==="development"?process.env.GOOGLE_CLIENT_ID_DEV: process.env.GOOGLE_CLIENT_ID_PROD ,
      clientSecret:process.env.NODE_ENV==="development"?process.env.GOOGLE_CLIENT_SECRET_DEV:process.env.GOOGLE_CLIENT_SECRET_PROD ,
      //   profileFields: ["email", "displayName", "photos"],
      callbackURL:process.env.NODE_ENV==="development"?process.env.GOOGLE_CALLBACK_URL_DEV: process.env.GOOGLE_CALLBACK_URL_PROD,
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
        if(!profile){
            return done("Error!")
        }
      User.findOne({ provider: "google", uid: profile.id }, (err, user) => {
        if (err) {
          console.log(err);

          return done(err);
        }  
        if (user) {
          return done(null, user);
        } else {
          console.log(profile);
            const {displayName,emails,id}=profile
          User.findOneAndUpdate({email:emails[0].value},{
            provider: "google",
            uid: id}).then((user) => {
              if(user){
                return done(null, user);
              }else{
 
                User.create({
                  email:emails[0].value,
                  first_name:displayName.split(" ")[0] || '',
                  last_name:displayName.split(" ")[1] || '',
                  provider: "google",
                  uid: id,
                  isCreatedBySocialLogin:true
                })
                  .then((user) => {
                    return done(null, user);
                  })
                  .catch((err) => {
                    return done(err);
                  });
              }
            }).catch(err=>{
              return done(err);
            })
           
        }
      }); 
    }
  )
);
