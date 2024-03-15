const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PropertiesSchema = new Schema({
    nickname: String,
    property_type: {
        type: String,
        required: true,
        enum: ["Apartment", "Condo", "Single-Property"]
    },
    loc_number: Number,
    loc_street: String,
    loc_propertyname: {
        type: String,
        required: false
    },
    loc_barangay: String,
    loc_city: String
}, { collection: 'Properties' });

module.exports = mongoose.model("Properties", PropertiesSchema);