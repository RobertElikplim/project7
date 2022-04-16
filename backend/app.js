// importing express module
const express = require('express');

// require mongoose library.
const mongoose = require('mongoose');

//require morgan library because it is middleware to log HTTP requests and errors, and simplifies the process.
const morgan = require('morgan');

// cors allowing the security applied to an API.
const cors = require('cors');

// awaiting for more readable asynchronous code.
const axios = require('axios');

require("dotenv").config();   // Require the dotenv
const app = express();

// Database connection
mongoose
    .connect(process.env.MONGO_URL)   // read environment variable from .env
    .then(() => {
        console.log("Database connection Success!");
    })
    .catch((err) => {
        console.error("Mongo Connection Error", err);
    });


//Middlewares
// declaring the port number for the api.
const PORT = process.env.PORT || 3000;
// browser security feature that restricts cross-origin HTTP requests
app.use(cors());       
// parsing incoming requests with json playloads.
app.use(express.json()); 
//enabling incoming request logging into dev mode.
app.use(morgan("dev"));


// connecting routes to the database. 
const activityRouter = require('./routes/activity')
app.use('/activity', activityRouter)
const clientRouter = require('./routes/client')
app.use('/client', clientRouter)
const eventRouter = require('./routes/event')
app.use('/event', eventRouter)
const familyRouter = require('./routes/family')
app.use('/family', familyRouter)
const workerRouter = require('./routes/worker')
app.use('/worker', workerRouter)


// listening to the port 
app.listen(PORT, () => {
    console.log("Server started listening on port: ", PORT);
});

// error handler control the error code in the console
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) 
        err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});


app.get('/external-api', (req, res) => {
    let apiURL = 'https://cis-4339.herokuapp.com/api/v1/data';
    axios.get(apiURL).then(response => {
        res.json(response.data);
        })
        .catch ((err) => {
        res.status(400).send(err.message);
    });
});
app.get('/:first_name/:last_name/:phone_number', function(req, res){
    var api = (req.params.first_name + "/"+ req.params.last_name + "/"+ req.params.phone_number )
    var apiURL = ('https://cis-4339.herokuapp.com/api/v1/data/' + api)
    axios.get(apiURL).then(response => {
        res.status(200).json(response.data);
    }).catch((error) =>{
        res.status(404).json({message: error})
    });
});