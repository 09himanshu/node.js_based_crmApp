
const controller = require('../controller/auth.controller');
const {signupVerify} = require('../middlewares')

module.exports = (app) => {

    // Route for signup
    app.post('/crm/api/v1/auths/signup', [signupVerify.validateSignUp], controller.signup);

    // Route for signin
    app.post('/crm/api/v1/auths/signin', controller.signin);
}