// To get versions of uuid that stored as _id
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb+srv://team7:project7@cluster0.vvpdb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
autoIncrement.initialize(connection);
ObjectId = Schema.ObjectId;

//creation of family schema and fields from sprint 1 submission we anticipate to use in the final form
let familySchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, ref: 'family' 
    },
    clientID: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        required: true
    },
    pregnant: {
        type: String,
    },   
}, {
    collection: 'family'
});

familySchema.plugin(autoIncrement.plugin, 'family');
module.exports = mongoose.model('family', familySchema)
