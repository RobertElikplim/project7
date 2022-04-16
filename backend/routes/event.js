const express = require('express');
const router = express.Router();
// const {validate} = require('uuid');
const eventModel = require('../models/event');


//creating the event schema in the databaseand confirms with user by generating a confirmation message
router.post('/', (req, res, next) => {
    eventModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data)
            // res.send('Event has added in the database.');
        }
    });
}); 

//retrieves all data under event schema
// get all of the events in the database minus the key with the array of client.
router.get('/allevents', (req, res, next) => {
    eventModel.find({},
      (error, data) => {
        // error handler
        if (error) {
            //using a call to next() to send an error message back
          return next(error);
        } else {
          res.json(data);
        }
      }
    );
  });

  // retrieve last 3 events 
router.get('/', (req, res, next) => {
  eventModel.find({},
    (error, data) => {
      // error handler
      if (error) {
          //using a call to next() to send an error message back
        return next(error);
      } else {
        res.json(data);
      }
    }
  ).sort({}).limit(3) // show the last 3 added events
});

router.get('/summary/', (req, res, next) => {
  eventModel.aggregate([
      {$match : { eventName : {$exists: true}} },
      {$project : {_id: 1, eventName: 1, eventDate: 1, eventAddress: 1 } },
      {$lookup : {from : 'client',localField : '_id',foreignField : 'eventID', as : 'summary'}},
      {$addFields: { COUNT : { $sum : {$size : "$summary"}}}},
  ], (error, data) => {
      if (error) {
        return next(error)
      } else {
          res.json(data);
  }
      }).sort({_id: -1}).limit(5)
});

router.get('/att/:id', (req, res, next) => {
  eventModel.aggregate([
      {$match : { _id : req.params.id} },
      {$project: {eventName: 1, eventDate : 1, eventAddress: 1, eventZipCode : 1,}},
      {$lookup : {from : 'clients',localField : '_id',foreignField : 'eventID', as : 'registered'}},
  ],(error, data) => {
      if (error) {
          return next(error);
      }
      else {
          res.json(data);
      }
  }).sort({_id: -1}).limit(3)
}); 

//retrieve a single event by ID
router.get('/:id', (req, res, next) => {
  // finding the documents based on clients ID
  eventModel.findById({ _id: req.params.id}, (error, data) => {
      if (error) {
          return next(error);
      }
      else if (data === null) {
          res.status(404).send('Event has not been found');
      }
      else {
          res.json(data);
      }
  })//.sort({ modifyAt: -1 }).limit(3);     // Return the latest document
}); 

//updating the event and confirms with user by generating a confirmation message
router.put('/:id', (req, res, next) => {
    eventModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          eventName: req.body.eventName,
          eventDate: req.body.eventDate,
          eventAddress: req.body.eventAddress,
          eventZipCode: req.body.eventZipCode,
        },
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.send('Event Information has been successfully added..');
        }
      }
    );
  });

//delete event by id and confirms with user by generating a confirmation message
router.delete('/:id', (req, res, next) => {
    eventModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Event information has been deleted from the database.');
        }
    });
});

module.exports = router
