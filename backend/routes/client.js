const express = require('express');
const router = express.Router();
const {validate} = require('uuid');
const clientModel = require('../testing/backend/models/client');
const eventModel = require('../testing/backend/models/event');


//creating the client schema in the database and confirms with user by generating a confirmation message
router.post('/', (req, res, next) => {
    clientModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Client information has stored in the database.');
        }
    });
}); 

router.get('/', (req, res, next) => {
    clientModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
            //console.log(data);
        }
    })
});

// get events that a client has registered for. 
router.get('/summary/:clientID', (req, res, next) => {
    clientModel.aggregate([
        {$match : { clientID: req.params.clientID}},
        {$lookup : {from : 'event',localField : 'events',foreignField : '_id', as : 'summary'}},
        {$unwind: '$summary'},
        {$group: {_id : {eventName : '$summary.eventName', eventDate : '$summary.eventDate', eventZipCode : '$summary.eventZipCode', eventAddress : '$summary.eventAddress',}}},
    ], (error, data) => {
        if (error) {
          return next(error)
        } else {
            res.json(data);
    }
    })
});

// total registered per event
router.get('/perevent', (req, res, next) => {
    clientModel.aggregate([
        {$match : { clientID: {$exists:true}}},        
        {$lookup : {from : 'event',localField : 'events',foreignField : '_id', as : 'summary'}},
        {$unwind: '$summary'},
        {$group: {_id : {eventZipCode:'$summary.eventZipCode'}, eventName : {$first :'$summary.eventName'}, count: {$sum:1}}},
    ], (error, data) => {
        if (error) {
          return next(error)
        } else {
            res.json(data);
    }
    })
});

//find total clients per race
router.get('/perrace', (req, res, next) => {
    clientModel.aggregate([
        {$match: {raceEthnicity: {$exists: true}}},
        {$group: {_id: '$raceEthnicity', count: {$sum:1}}}
    ],(error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
});

//find total clients per race
router.get('/perzip', (req, res, next) => {
    clientModel.aggregate([
        {$match: {zipCode: {$exists: true}}},
        {$group: {_id: '$zipCode', count: {$sum:1}}}
    ],(error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
});


// finding the documents based on clients ID
router.get('/:id', (req, res, next) => {
    clientModel.findOne({clientID: req.params.id}, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client has not been found');
        }
        else {
            res.json(data);
        }
    })
});

// finding the documents based on _id
router.get('/one/:id', (req, res, next) => {
    clientModel.findById(req.params.id, {__v:0, _id:0}, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client has not been found');
        }
        else {
            res.json(data);
        }
    })
});

//updating the client by id and confirms with user by generating a confirmation message
router.put('/:id/', (req, res, next) => {
    clientModel.findByIdAndUpdate(req.params.id, {$set: req.body }, (error, data) => {
       if (error) {
           return next(error);
       }
       else {
           res.send('Client has been successfully edited.');
           //console.log('Client successfully updated!', data)
       }
    })
});

// GET(READ): endpoint to add event to client based on ID
router.patch('/:id', (req, res, next) => {
    clientModel.findByIdAndUpdate(req.params.id ,{$push: {events : req.body.events}}, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Event added to client info');
            console.log(data)
        }
    })
});
   
router.get('/phone/:phoneNumber', (req, res, next) => {
    // finding the documents based on phoneNumber
    clientModel.find({ phoneNumber: req.params.phoneNumber }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client has not been found');
        }
        else {
            res.json(data);
        }
    })
});

router.get('/events/:id', (req, res, next) => {
    // Finding document based on client last name.
    clientModel.aggregate([
        {$match :  {_id: req.params.id }},
        {$project : {_id: 1,firstName: 1, lastName: 1, zipCode: 1}},
        {$lookup : {from : 'event', localField : 'events._id', foreignField : '_id', as : 'store'}},
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client has not been found from  API');
        }
        else {
            res.json(data);
        }
    }).sort({ _id: 1 });
});

// GET(READ): endpoint to retrieve client by client last name.
router.get('/lastname/:lastName', (req, res, next) => {
    // Finding document based on client last name.
    clientModel.aggregate([{ $sort: { clientID: 1, modifyAt: 1 } },
        { $group: { _id: "$clientID", latest: { $last: "$$ROOT" } } },
        { $match: { "latest.lastName": req.params.lastName } }
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client has not been found from  API');
        }
        else {
            res.json(data);
        }
    }).sort({ _id: 1 });
});

// GET(READ): endpoint to get all clients history from API.
router.get('/history/:id', (req, res, next) => {
    clientModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client has not been found from API');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 });
});

// delete client by id and confirms with user by generating a confirmation message
router.delete('/:_id', (req, res, next) => {
    clientModel.findByIdAndRemove(req.params._id, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Client information has been deleted from the database.');
        }
    });
});



module.exports = router