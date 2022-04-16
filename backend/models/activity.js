// To get versions of uuid that stored as _id
const uuid = require("uuid");
const mongoose = require("mongoose");
const { Router } = require("express");
const Schema = mongoose.Schema;

//creation of activity schema and fields we anticipate to use in the form from sprint 1 submission
let activitySchema = new Schema ({
    _id: {
        type: String,
        default: uuid.v1
    },
    clientID: { //will be selelcted from the client collection
        type: String,
        required: true
    },
    program: { // will be selected from a drop down menu
        type: String,
        required: true
    },
    shortNotes: { 
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    hasUsedServices: { // will be selected from a drop down menu
        type: String
    },
    workerID: { // will be selected from a drop down menu
        type: String
    }
},
    {
        collection: 'activity'
});

module.exports = mongoose.model('activity', activitySchema)
