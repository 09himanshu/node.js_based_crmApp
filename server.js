const express = require('express');
const config = require('./config/server.config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models').user;
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Connect app with database
mongoose.connect(config.host, () => {
    console.log('Mongodb connected');
    init();
})

async function init() {
    let user = await User.findOne({userId: 'admin'});
    if(user) return;
    else {

        const user = await User.create({
            name: 'Himanshu',
            userId: 'admin',
            email: '09himanshuadmin@gmail.com',
            userType: 'ADMIN',
            password: bcrypt.hashSync('0901200112')
        })
    }
}

// Routes
require('./routes/auth.routes')(app);
require('./routes/users.routes')(app);

// App listen on port
app.listen(config.port, () => {
    console.log(`Application started on port ${config.port}`);
})