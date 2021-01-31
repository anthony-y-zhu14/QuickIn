const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const business_data_schema = new Schema({
    b_id: [
        {
            date: [
                {c_id: String, time: String}
            ]
        }
    ]
})

module.exports = mongoose.model('Business_Data', business_data_schema);

