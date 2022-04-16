const express = require('express');
const router = express.Router();
const {validate} = require('uuid');
const familyModel = require('../models/family');


// creating the family schema in the database and confirms with user by generating a confirmation message
router.post('/', (req, res, next) => {
    familyModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Families information has added in the database.');
        }
    });
}); 

//retrieves all data under family schema
router.get('/', (req, res, next) => {
    familyModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            if (data === null) {
            res.status(404).send ('Family not found.');
        }
        else {
            res.json(data);
        }}
    });
});

//retrieves data for a family with a specific id
router.get('/:id', (req, res, next) => {
    familyModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send ('Family info with that ID not found.');
        }
        else {
            res.json(data);
        }
    });
});

router.get('/one/:id', (req, res, next) => {
    familyModel.findOne({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send ('Family info with that ID not found.');
        }
        else {
            res.json(data);
        }
    });
});

//update to add family member by ID and confirms with user by generating a confirmation message
router.put('/:id', (req, res, next) => {
    familyModel.findOneAndUpdate({ _id: req.params.id }, {$set: req.body },{
    }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Family has been added.');
            console.log('Family member has been successfully updated.')
        }
    });
});

// delete family by id and confirms with user by generating a confirmation message
router.delete('/:id', (req, res, next) => {
    familyModel.findByIdAndRemove({ _id: req.params.id}, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Family information has been deleted from the database.');
        }
    });
});

module.exports = router
