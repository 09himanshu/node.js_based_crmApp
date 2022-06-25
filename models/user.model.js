// This file will hold the schema for the user resourse

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }, 
    userId: {
        type: String,
        require: true,
        unique: true,
    }, 
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        minlength: 12,
    },
    createdAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },
    updateAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },
    userType: {
        type: String,
        require: true,
        default: 'CUSTOMER'
    },
    userStatus: {
        type: String,
        require: true, 
        default: 'APPROVED'
    },
    ticketsCreated: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'ticket'
    },
    ticketAssigned: {
        type: [mongoose.SchemaType.ObjectId],
        ref: 'ticket'
    }
})


module.exports = mongoose.model('user', userSchema);