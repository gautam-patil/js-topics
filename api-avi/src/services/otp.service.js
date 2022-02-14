var otpGenerator = require('otp-generator')
exports.createOtp = () => {
    return otpGenerator.generate(6, { upperCase: false, specialChars: false });
};