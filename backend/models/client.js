// To get versions of uuid that stored as _id
const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb+srv://team7:project7@cluster0.vvpdb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
autoIncrement.initialize(connection);
ObjectId = Schema.ObjectId;

//creation of client schema and fields from sprint 1 submission we anticipate to use in the final form
let clientSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    clientID: {
        type: String,
        default: uuid.v1
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    socialSecurityNumber: {
        type: String,
        required: true,
    },
    otherDoc: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    driverLicense: {
        type: Number  
    },
    isNeedSupport: {
        type: String,
        required: true
    },
    numChildren: {
        type: Number,
        required: true
    },
    is65OrOlder: {
        type: String
    },
    education: {
        type: String
    },
    marriageStatus:{
        type: String
    },
    job: {
        employmentStatus: {
            type: String,
            required: true
        },
        employer: {
            type: String
        },
        role: {
            type: String
        },
    },
    approached: {
        type: String
    },
    isVeteran: {
        type: String,
    },
    raceEthnicity: {
        type: String,
    },
    
    events: 
    {type: Array}
},
{
    collection: 'client'
});

clientSchema.plugin(autoIncrement.plugin, 'client');
const client = mongoose.model('Client', clientSchema)
module.exports = client;