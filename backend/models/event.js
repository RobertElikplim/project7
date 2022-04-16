// To get versions of uuid that stored as _id
const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creation of event schema and fields from sprint 1 submission we anticipate to use in the final form
let eventSchema = new Schema({
    _id: { 
      type: String,
       default: uuid.v1 
    },
    eventName: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventAddress: {
      type: String,
      required: true
    },
    eventZipCode: {
      type: Number,
      required: true
    }
  }, {
    collection: 'event'
  });

  const event = mongoose.model('Event', eventSchema);
  module.exports = event;
