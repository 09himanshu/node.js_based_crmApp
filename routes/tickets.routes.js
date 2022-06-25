

const controller = require('../controller/ticket.controller');
const {jwtVerify} = require('../middlewares');


module.exports = (app) => {
    app.post('/crm/api/v1/tickets', [jwtVerify.verifyToken], controller.create);
}