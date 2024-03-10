const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PropertiesSchema = new mongoose.Schema({
    property_type: String,
    loc_street: String, 
    loc_barangay: String, 
    loc_city: String, 
    loc_posx: String, 
    loc_posy: String, 
}, { collection: 'Properties' });

module.exports = mongoose.model("Properties", PropertiesSchema);