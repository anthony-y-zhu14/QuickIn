const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitorSchema = new Schema({
    c_id: String,
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    phoneNumber: String,
    password: String
})

module.exports = mongoose.model('Visitor', visitorSchema);