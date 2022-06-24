const signupVerify = require('./verifysignup');
const jwtVerify = require('./authjwt.middleware');

module.exports = {
    signupVerify,
    jwtVerify
}