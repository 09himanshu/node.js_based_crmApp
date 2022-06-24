// This file will have all the logic to manipulate users resource

const db = require('../models');
const User = db.user;
const object = require('../utils/object.util');

/** 
 * Fetch the list of all users
 *  - Only Admin is allowed to call this method 
 *   -Admin should able to filter based on:
 *      1. Name
 *      2. UserType
 *      3. UserStatus
*/ 

exports.findAll = async (req, res) => {
    let query = {};
    let name = req.query.name;
    let userType = req.query.userType;
    let userStatus = req.query.userStatus;

    if(name && userType && userStatus) {
        query.name = name;
        query.userType = userType;
        query.userStatus = userStatus;
    } else if(name && userType) {
        query.name = name;
        query.userType = userType;
    } else if(name && userStatus) {
        query.name = name;
        query.userStatus = userStatus;
    } else if(userType && userStatus) {
        query.userType = userType;
        query.userStatus = userStatus;
    } else if(name) {
        query.name = name;
    } else if(userType) {
        query.userType = userType;
    } else if(userStatus) {
        query.userStatus = userStatus;
    }

    try{
        const users = await User.find(query);
        res.status(200).send(object.userResponse(users));
    }catch(err) {
        res.status(500).send({message: `Error occur at ${err}`}); 
    }
}

// Fetch the user based on the userID
exports.findById = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.find({userId});
    try{
        if(user) {
            res.status(200).send(object.userResponse(user))
        } else {
            res.status(404).send({message: `Invalid user Id no user found`})
        }
    }catch(err) {
        res.status(500).send({message: `Error occur at ${err}`});
    }
    
}

/**
 * Update the user status, userType
 *  -Only Admin is allowed to call this method
 */ 

exports.update = (req, res) => {
    const obj = {
        name: req.body.name,
        userStatus: req.body.userStatus,
        userType: req.body.userType
    }
    try{
        const userId = req.params.userId;
        const user = User.findOneAndUpdate({userId}, obj).exec();
        res.status(200).send({message: `User record updated successfully`});
    } catch(err) {
        res.status(500).send({message: `Error occur at ${err}`});
    }
}






