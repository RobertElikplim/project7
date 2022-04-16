// To get versions of uuid that stored as _id
const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb+srv://team7:project7@cluster0.vvpdb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
autoIncrement.initialize(connection);
ObjectId = Schema.ObjectId;

//creation of worker schema and fields from sprint 1 submission we anticipate to use in the final form
let workerSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, ref: 'worker'
    },
    workerID: {
        type: String,
        default: uuid.v1
    },
    fullName: {
        type: String,
        required: true
    }
},
    {
        collection: 'worker'
    }
);

workerSchema.plugin(autoIncrement.plugin, 'worker');
module.exports = mongoose.model('worker', workerSchema);
