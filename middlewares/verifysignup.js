
// This file will contain the custom middleware for varifying the request body
const db = require('../models');
const User = db.user;

const validateSignUp = async (req, res, next) => {
    // validate if username exists
    if(!req.body.name) {
        return res.status(400).send({message: `Name is not present `});
    }

    // check userId
    if(!req.body.userId) {
        return res.status(400).send({message: `User Id is not present `});
    }
    let userId = await User.findOne({userId: req.body.userId});
    if(userId) {
        return res.status(401).send({message: `UserId ! is already exist `});
    }

    // Check password
    if(!req.body.password) {
        return res.status(400).send({message: `Passowrd is not present `});
    }

    // check email
    if(!req.body.email) {
        return res.status(400).send({message: `Email is not present `});
    } 
    const email = await User.findOne({email: req.body.email});
    if(email) {
        return res.status(401).send({message: `Email !!,  is already exist `});
    }

    next();
}

module.exports = {
    validateSignUp
}