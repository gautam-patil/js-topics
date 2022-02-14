const express = require('express');
const path = require("path");
const passport = require("passport");
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const stripe=require("stripe")(process.env.STRIPE_KEY);
const uuid=require("uuid").v4
const {  tokenService } = require('./services');
const { email } = require('./config/config');
require("./passport/passportGoogle");
require("./passport/passportFacebook");
require("./passport/passportJwt")(passport);

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
app.use(express.static(path.join(__dirname, "public")));
// console.log(__dirname);
// set security HTTP headers
app.use(helmet());
global.__basedir = __dirname;
console.log(__basedir)
// parse json request body
app.use(express.json({limit: '5mb'}));


// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}
console.log(process.env.NODE_ENV);

app.get(
  "/auth/google/callback",
  passport.authenticate("google",{session:false}),   
  async(req, res) => {
    try {
        console.log(req.user); 

  const tokens = await tokenService.generateAuthTokens(req.user);
  console.log(tokens);
  res.redirect(`${process.env.NODE_ENV==="development"?process.env.REDIRECT_URL_DEV:process.env.REDIRECT_URL_PROD}?auth=` + `${req.user.id}&&${tokens.refresh.token}&&`);
  // res.status(httpStatus.CREATED).send();
      // res.send({ token: signToken(req.user.id) });
    } catch (err) {
      console.log(err);
    }
  }
);
app.get("/testurl",(req,res)=>{
  res.status(200).json({
    dev:process.env.NODE_ENV,
    dev:{
      cid:process.env.FACEBOOK_CLIENT_ID_DEV,
      csec:process.env.FACEBOOK_CLIENT_SECRET_DEV,
      curl:process.env.FACEBOOK_CALLBACK_URL_DEV
    },
    prod:{
      cid:process.env.FACEBOOK_CLIENT_ID_PROD,
      csec:process.env.FACEBOOK_CLIENT_SECRET_PROD,
      curl:process.env.FACEBOOK_CALLBACK_URL_PROD
    },
    cId:process.env.NODE_ENV==="development"?process.env.FACEBOOK_CLIENT_ID_DEV: process.env.FACEBOOK_CLIENT_ID_PROD,
    clientSecret:process.env.NODE_ENV==="development"?process.env.FACEBOOK_CLIENT_SECRET_DEV:process.env.FACEBOOK_CLIENT_SECRET_PROD ,
      profileFields: ['id', 'emails', 'name','gender'] ,
      callbackURL:process.env.NODE_ENV==="development"?process.env.FACEBOOK_CALLBACK_URL_DEV: process.env.FACEBOOK_CALLBACK_URL_PROD,
  })
})
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook",{session:false}),
  async(req, res) => {
    try {
        console.log(req.user);

        const tokens = await tokenService.generateAuthTokens(req.user);
        const token=tokens.refresh.token;
        res.redirect(`${process.env.NODE_ENV==="development"?process.env.REDIRECT_URL_DEV:process.env.REDIRECT_URL_PROD}?auth=` + `${req.user.id}&&${tokens.refresh.token}&&`);
  // const tokens = await tokenService.generateAuthTokens(req.user);
  // res.status(httpStatus.CREATED).send({user:req.user, tokens });
      // res.send({ token: signToken(req.user.id) });
    } catch (err) {
      console.log(err);
    }
  }
);
app.post('/payments',(req,res,next)=>{
const {token,product}=req.body
// console.log(token);
const idempontencyKey=uuid();
console.log(idempontencyKey);
  return stripe.customers.create({
    email:token.email,
    source:token.id,
    name:token.card.name,
    address:{
      line1:token.card.name,
      country:token.card.address_country
    },
  }).then(customer=>{
    console.log(customer);
    stripe.charges.create({
      amount:product.price *100,
      currency:'inr',
      customer:customer.id,
      shipping:{
        name:token.card.name,
        address:{
          line1:token.card.name,
          country:token.card.address_country
        }
      },
      description:`Buy a package ${product.title}`
    })
  }).then(result=>{
    res.status(200).json(result)
  }).catch(err=>{
    console.log(err);
  })
})

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
