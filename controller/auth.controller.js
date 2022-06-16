
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('../utils/constants');
const config = require('../config/server.config');
const db = require('../models');
const User = db.user;

// Controller for signup
exports.signup = async (req, res) => {

    let userStatus = req.body.userStatus;
    if(!req.body.userStatus) {
        if(!req.body.userType || req.body.userType == util.userTypes.customer) {
            userStatus = util.userStatus.approved;
        } else {
            userStatus = util.userStatus.pending; 
        }
    }
    const obj = {
        name: req.body.name,
        userId: req.body.userId,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email,
        userType: req.body.userType,
        userStatus: userStatus, 
    }
    try {
        const user = await User.create(obj);
        // console.log('User created', user);
        res.status(201).send({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus,
            createdAt: user.createdAt,
            updatedAt: user.updateAt,
        })
    } catch(err) {
        console.log(err);
        res.status(500).send({message: `Error occur at ${err}`});
    }
    
}

// Controller for signin

exports.signin = async (req, res) => {

    try {
        // check user exists or not
        const user = await User.findOne({userId: req.body.userId});
        if(!user) {
            return res.status(404).send({message: `User not found`});
        }

        // verify password
        let isValid =  bcrypt.compareSync(req.body.password, user.password);

        if(!isValid) {
            res.status(401).send({message: `Invalid password`});
        }

        // check for user approved or not
        if(user.userStatus != util.userStatus.approved) {
            return res.status(200).send({message: `You are not approved for login`})
        }

        // Generate token
        let token = jwt.sign({id: user.userId}, config.secret, {
            expiresIn: 600
        })
        res.status(200).send({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userStatus: user.userStatus,
            userType: user.userType,
            token: token
        })
    } catch (err) {
        res.status(500).send({message: `Error occur at ${err}`});
    }
    
    
}