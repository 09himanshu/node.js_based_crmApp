
const jwt = require('jsonwebtoken');
const config = require('../config/server.config');
const utils = require('../utils/constants');
const db = require('../models');
const User = db.user;
/**
 * Authentication
 */

const verifyToken = (req, res, next) => {
    // Read token
    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(403).send({message: `No token provided`});
    }

    // Verify token
    jwt.verify(token, config.secret, (err, decode) => {
        if(err) {
            return res.status(401).send({message: `Unauthorized`});
        }

        // Try to read the userId from the decode token and store it in req obj
        req.userId = decode.id;
        next();
    });
}

// Check admin
const isAdmin = async (req, res, next) => {
    // Fetch user from db using the userId
    const user = await User.findOne({userId:  req.userId});
    if(user && user.userType == utils.userTypes.admin) {
        next();
    } else {
        return res.status(403).send({message: `Only ADMIN can access`});
    }
}


module.exports = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}
