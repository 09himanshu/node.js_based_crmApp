if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    port: process.env.port,
    host: process.env.host,
    secret: process.env.secret,
}