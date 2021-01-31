const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessSchema = new Schema({
    businessName: String,
    phoneNumber: String,
    password: String,       
    email: String,
    addressOne: String,
    addressTwo: String,
    city: String,
    postalCode: String,
    province: String,
    country: String,
    businessId: String,
    businessKey: String
})

module.exports = mongoose.model('Business', businessSchema);