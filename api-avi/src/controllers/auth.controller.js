const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const { otpService:{createOtp} } = require('../services');
const { sendConfirmEmail } = require('../services/email.service');
const ApiError = require('../utils/ApiError');
const {User} = require('../models');

const register = catchAsync(async (req, res) => {
  const otp=createOtp()
  const user = await userService.createUser({...req.body,
    emailVerificationToken: `${otp}`,
    emailVerified: false,
    emailVerificationTokenExpires: Date.now() + 10 * 60 * 1000});
    user.password = undefined;
    user.emailVerificationToken = undefined;
    
    await sendConfirmEmail(user.email,otp)
  res.status(httpStatus.CREATED).send({ user });
});

const confirmEmail=catchAsync(async(req,res)=>{
  const user = await User.findOne({
    emailVerificationToken: req.body.emailVerificationToken,
    emailVerificationTokenExpires: { $gt: Date.now() },
  });
  console.log(req.body.emailVerificationToken);
  console.log(user, "User");

  if (!user) {
    new ApiError(httpStatus.BAD_REQUEST,"Invalid otp or otp has expired")
  }
  user.emailVerified = true;
  user.active = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;

  await user.save({ validateBeforeSave: false });
  const tokens = await tokenService.generateAuthTokens(user);

  user.password = undefined;

  res.status(200).send({ user ,tokens});
})

const resendOtp=catchAsync(async(req,res)=>{
  const user = await User.findOne({ email: req.body.email });
  if (!user) {   
    new ApiError(httpStatus.NOT_FOUND,"Invalid otp or otp has expired")
  } else {
    const otp = createOtp();
    console.log(otp);
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        emailVerificationToken: otp,
        emailVerificationTokenExpires: Date.now() + 10 * 60 * 1000,
      },
      {
        new: true,
        runValidators: true,
      }
    );

   
      await sendConfirmEmail(user.email,otp)
    res.status(200).send("Otp sent successfully")
  }
})

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginUserWithEmailOrPhoneAndPassword(username, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  console.log(resetPasswordToken);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  resendOtp,
  confirmEmail
};
