const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const b_data_schema = new Schema({
    b_id: String,
    timeOfVisit: String,
    visitorFName: String,
    visitorLName: String,
    vistorNumber: String
})

module.exports = mongoose.model('b_data', b_data_schema);

