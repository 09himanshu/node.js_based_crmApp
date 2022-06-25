
// This file represent the schema for the tickets

const mongoose = require('mongoose');
const utils = require('../utils/constants');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    },
    ticketPriority: {
        type: Number,
        required: true,
        default: utils.ticketPriority.four,
    },
    status: {
        type: String,
        required: true,
        default: utils.ticketStatus.open
    },
    repoter: {
        type: String,
    },
    assignee: {
        type: String
    }, 
    createdAt: {
        type: Date,
        immutable: true,
        default: () => { return Date.now()}
    },
    updatedAt: {
        type: Date,
        default: () => { return Date.now()}
    }
})

module.exports = mongoose.model('ticket', ticketSchema);