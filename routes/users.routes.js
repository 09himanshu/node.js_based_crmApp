
// DEfine routes for the users resource

const controllers = require('../controller/user.controller')
const {jwtVerify} = require('../middlewares')
module.exports = (app) => {

    // Get all users resource
    app.get('/crm/api/v1/users', [jwtVerify.verifyToken, jwtVerify.isAdmin], controllers.findAll)

    // Get all users resource based on Id
    app.get('/crm/api/v1/users/:userId',[jwtVerify.verifyToken], controllers.findById)

    // UPdate user resource
    app.put('/crm/api/v1/users/:userId', [jwtVerify.verifyToken, jwtVerify.isAdmin], controllers.update);
}