const express = require('express');
const router = express.Router();
const {validate} = require('uuid');
const workerModel = require('../models/worker');

// creating the worker schema in the database and confirms with user by generating a confirmation message
router.post('/', (req, res, next) => {
    workerModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Worker information has added to the database.');
        }
    });
}); 



//retrieves all data under worker schema
router.get('/', (req, res, next) => {
    workerModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send ('Worker has not been found.'); //returns when worker data has not been found
        }
        else {
            res.json(data);
        }
    });
});


//retrieves data for a worker with a specific id
router.get('/:id', (req, res, next) => {
    workerModel.findOne({ workerID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send ('Worker information with that ID was not found.'); //return if specific id was not the input
        }
        else {
            res.json(data);
        }
    });
});


//retrieves data for a worker with a specific last name
router.get('/lastname/:lastname', (req, res, next) => {
    workerModel.find({ lastName: req.params.lastname }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send ('Worker info with that last name not found.'); //return if specific last name has not been put
        }
        else {
            res.json(data);
        }
    }).sort({ workerID: 1});
});




//updating the worker by id and confirms with user by generating a confirmation message
router.put('/:id', (req, res, next) => {
    workerModel.findOneAndUpdate({ workerID: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        } 
        else {
            res.send('Worker information has been updated.');
            console.log('Worker information has been successfully updated now', data) //returns when worker information has been updated
        }
    });
});

// delete worker by id and confirms with user by generating a confirmation message

router.delete('/', (req, res, next) => {
    workerModel.deleteOneAndRemove({ _id: req.params.id}, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Worker information has been deleted from the database.'); //returns when worker id has been successfully deleted.
        }
    });
});

module.exports = router
