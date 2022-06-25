
const Ticket = require('../models').ticket;
const User = require('../models').user;
const utils = require('../utils/constants');
const object = require('../utils/object.util');

// create a ticket
exports.create = async (req, res) => {
    // logic to create tickets
    const obj = {
        title: req.body.title,
        description: req.body.description,
        ticketPriority: req.body.ticketPriority
    }

    // if any engineer avaliable
    const engineer = await User.findOne({
        userType: utils.userTypes.engineer,
        userStatus: utils.userStatus.approved
    });
    
    if(engineer) {
        obj.assignee = engineer.userId;
    }

    try{
        const ticket = await Ticket.create(obj);
        res.status(201).send(object.ticketsResponse(ticket));
    } catch(err) {
        res.status(500).send({message: `Error occur at ${err}`});
    }

}