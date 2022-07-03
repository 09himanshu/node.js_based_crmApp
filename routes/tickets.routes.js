

const controller = require('../controller/ticket.controller');
const {jwtVerify} = require('../middlewares');


module.exports = (app) => {
    // Route to create tickets
    app.post('/crm/api/v1/tickets', [jwtVerify.verifyToken], controller.create);

    // Routes to get all tickets
    app.get('/crm/api/v1/tickets', [jwtVerify.verifyToken], controller.find);

    // Route to get tickets based on ids
    app.get('/crm/api/v1/tickets/:id', [jwtVerify.verifyToken], controller.findById);
}