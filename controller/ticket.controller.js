
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
        // Find out the customer
        if(ticket) {
            let user = await User.findOne({userId: req.userId});
            user.ticketsCreated.push(ticket._id);
            await user.save();

            // Update the engineer
            engineer.ticketAssigned.push(ticket._id);
            await engineer.save();
            res.status(201).send(object.ticketsResponse(ticket));
        }
    } catch(err) {
        res.status(500).send({message: `Error occur at ${err}`});
    }
}

// Get all tickets
exports.find = async (req, res) => {
    let ticket = await Ticket.find();
    try{
        res.status(200).send(object.ticketsResponse(ticket));
    } catch(err) {
        res.status(500).send({message: `Error occur at ${err}`});
    }
}