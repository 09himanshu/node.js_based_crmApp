const express = require('express');
const config = require('./config/server.config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Connect app with database
mongoose.connect(config.host, () => {
    console.log('Mongodb connected');
})

// Routes
require('./routes/auth.routes')(app);

// App listen on port
app.listen(config.port, () => {
    console.log(`Application started on port ${config.port}`);
})