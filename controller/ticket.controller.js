
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

    const user = await User.findOne({userId: req.userId});
    let status = req.query.status;
    let ticketPriority = req.query.ticketPriority;
    let ticket;
    if(status) {
        ticket = await Ticket.find({
            status,
            _id: {
                $in: user.ticketsCreated
            },
        });
    }  else if(ticketPriority) {
        ticket = await Ticket.find({
            ticketPriority,
            _id: {
                $in: user.ticketsCreated
            },
        });
    }else {
        ticket = await Ticket.find({
            _id: {
                $in: user.ticketsCreated
            },
        });
    }
    try{
        res.status(200).send(object.ticketListResponse(ticket));
    }catch(err) {
        res.status(500).send({message: `Error occur at ${err}`});
    }
}

// Get tickets based on ids
exports.findById = async(req, res) => {
    const ticket = await Ticket.findOne({
        _id: req.params.id
    });
    try{
        res.status(200).send(object.ticketsResponse(ticket));
    } catch(err) {
        res.status(500).send({message: `Error occur at ${err}`});
    }
}

// Update the tickets
exports.update = async (req, res) => {
    // check if the ticket exists
    const ticket = await Ticket.findOne({
        _id: req.params.id
    });
    if(!ticket) {
        return res.status(404).send({message: `Ticket not found`});
    }

    // Update the attributes of the saved ticket
    const user = await User.findOne({
        userId: req.userId
    })
    if(!user.ticketsCreated.includes(req.params.id)) {
        return res.status(403).send({message: `Only owner of the ticket is allowed to update`});
    }

    ticket.title = req.body.title != undefined ? req.body.title : ticket.title;
    ticket.description = req.body.description != undefined ? req.body.description : ticket.description;
    ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority;
    ticket.status = req.body.status != undefined ? req.body.status : ticket.status;


    // Save thr chnage ticket

    // Return the updated tickets
}