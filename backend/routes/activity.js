const express = require('express');
const router = express.Router();
const {validate} = require('uuid');
const activityModel = require('../models/activity');
const clientModel = require('../models/client');
const workerModel = require('../models/worker');

// creating the activity schema in the database and confirms with user by generating a confirmation message
router.post('/', (req, res, next) => {
    activityModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data)
            // res.send('Activity information has been added to the database.');
        }
    });
}); 

//retrieves all data for activity schema
router.get('/', (req, res, next) => {
    activityModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            if (data === null) {
            res.status(404).send ('Activity not found.');
        }
        else {
            res.json(data);
        }}
    });
});

router.get('/peractivity', (req, res, next) => {
    activityModel.aggregate([
        {$match: {program: {$exists: true}}},
        {$group: {_id: '$program', count: {$sum:1}}}
    ],(error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ date: -1 });
});

/* router.get('/:each', (req, res, next) => {
    activityModel.aggregate([
        {$match: {program: req.params.each}},
        {$group: {_id: '$program', count: {$sum:1}}}
    ],(error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ date: -1 });
}); */

router.get('/:each', (req, res, next) => {
    activityModel.aggregate([
        {$match: {program: req.params.each}},
        {$lookup: {from: 'client', localField: 'clientID', foreignField: 'clientID', as : 'peractivity' }},
        {$group: {_id: '$program', }}
    ],(error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ date: -1 });
});

//Retrieves all activities with client & worker name
router.get('/summary', (req, res, next) => {
    activityModel.aggregate([
        {
            // JOIN CLIENT COLLECTION.
            $lookup: {
                from: clientModel.collection.name,
                as: "clientInfo",
                let: { "clientID": "$clientID" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$$clientID", "$clientID"] } } },
                    { "$sort": { "modifyAt": -1 } },
                    { "$limit": 1 }
                ]
            }
        }, { $unwind: "$clientInfo" },
        {
            // JOIN WORKER COLLECTION.
            $lookup: {
                from: workerModel.collection.name,
                localField: "workerID",
                foreignField: "workerID",
                as: "workerInfo",
            }
        }, { $unwind: "$workerInfo" },
        {
            //Fields that need to be retrieved
            $project: {
                _id: 1,
                clientID: 1,
                program: 1,
                shortNotes: 1,
                location: 1,
                date: 1,
                hasUsedServices: 1,
                workerID: 1,
                clientLastName: "$clientInfo.lastName",
                clientFirstName: "$clientInfo.firstName",
                workerLastName: "$workerInfo.lastName",
                workerFirstName: "$workerInfo.firstName"
            }
        }
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ date: -1 });
});


//Retrieves all activities related to one client info by client ID 
router.get('/summary-client/:id', (req, res, next) => {
        // Finding document based on client ID.
    activityModel.aggregate([ { $match : { id : req.params._id } },
        {
            // JOIN CLIENT COLLECTION.
            $lookup: {
                from: clientModel.collection.name,
                as: "clientInfo",
                let: { "clientID": "$clientID" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$$clientID", "$clientID"] } } },
                    { $sort: { modifyAt: -1 } },
                    { $limit: 1 }
                ]
            }
        }, { $unwind: "$clientInfo" },
        {
            // JOIN WORKER COLLECTION.
            $lookup: {
                from: workerModel.collection.name,
                localField: "workerID",
                foreignField: "workerID",
                as: "workerInfo",
            }
        }, { $unwind: "$workerInfo" },
        {
            //Fields that need to be retrieved
            $project: {
                _id: 1,
                clientID: 1,
                program: 1,
                shortNotes: 1,
                location: 1,
                date: 1,
                hasUsedServices: 1,
                workerID: 1,
                clientLastName: "$clientInfo.lastName",
                clientFirstName: "$clientInfo.firstName",
                workerLastName: "$workerInfo.lastName",
                workerFirstName: "$workerInfo.firstName"
            }
        }
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Activity info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ date: -1 });
});

 

//Retrieves all activities by worker ID 
router.get('/summary-worker/:id', (req, res, next) => {
    // Finding document based on workerID
    activityModel.aggregate([ { $match: { workerID: req.params.id } },
        {
            // JOIN CLIENT COLLECTION.
            $lookup: {
                from: clientModel.collection.name,
                as: "clientInfo",
                let: { "clientID": "$clientID" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$$clientID", "$clientID"] } } },
                    { $sort: { modifyAt: -1 } },
                    { $limit: 1 }
                ]
            }
        }, { $unwind: "$clientInfo" },
        {
            // JOIN WORKER COLLECTION.
            $lookup: {
                from: workerModel.collection.name,
                localField: "workerID",
                foreignField: "workerID",
                as: "workerInfo",
            }
        }, { $unwind: "$workerInfo" },
        {
            //Fields that need to be retrieved
            $project: {
                _id: 1,
                clientID: 1,
                program: 1,
                shortNotes: 1,
                location: 1,
                date: 1,
                hasUsedServices: 1,
                workerID: 1,
                clientLastName: "$clientInfo.lastName",
                clientFirstName: "$clientInfo.firstName",
                workerLastName: "$workerInfo.lastName",
                workerFirstName: "$workerInfo.firstName"
            }
        }
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Activity info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ date: -1 });
});





//retrieves all data under activity schema by event date
router.get('/date/:date', (req, res, next) => {
 
    // Finding document based on a specific date.
    activityModel.aggregate([ { $match: { date: req.params.date }},
        {
            // JOIN CLIENT COLLECTION.
            $lookup: {
                from: clientModel.collection.name,
                as: "clientInfo",
                let: { "clientID": "$clientID" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$$clientID", "$clientID"] } } },
                    { $sort: { modifyAt: -1 } },
                    { $limit: 1 }
                ]
            }
        }, { $unwind: "$clientInfo" },
        {
            // JOIN WORKER COLLECTION.
            $lookup: {
                from: workerModel.collection.name,
                localField: "workerID",
                foreignField: "workerID",
                as: "workerInfo",
            }
        }, { $unwind: "$workerInfo" },
        {
            // DEFINE THE FIELDS THAT NEED TO FETCH.
            $project: {
                _id: 1,
                clientID: 1,
                program: 1,
                shortNotes: 1,
                location: 1,
                date: 1,
                hasUsedServices: 1,
                workerID: 1,
                clientLastName: "$clientInfo.lastName",
                clientFirstName: "$clientInfo.firstName",
                workerLastName: "$workerInfo.lastName",
                workerFirstName: "$workerInfo.firstName"
            }
        }
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Activity information not found for specific date.');
        }
        else {
            res.json(data);
        }
    }).sort({ date: -1 });
});



//Retrieves all activities for one client info by a specific client ID.
router.get('/:id', (req, res, next) => {
    // Finding document based on clientID
    activityModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Activity info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ date: -1 });
});



//updating the activity by id and confirms with user by generating a confirmation message
router.put('/:id', (req, res) => {
 activityModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body }, (error, data) => {
    if (error) {
        return next(error);
    }
    else {
        res.send('Activity has been successfully edited.');
    console.log('Activity successfully updated!', data)
    }
 })
});


//Delete activity by id and confirms with user by generating a confirmation message

router.delete('/:id', (req, res, next) => {
    activityModel.findByIdAndRemove({ _id: req.params.id}, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Activity information has been deleted from the database.');
        }
    });
});
    
module.exports = router
