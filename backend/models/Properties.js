const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PropertiesSchema = new Schema({
    image_link: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
    },
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
    loc_city: String,
    isHidden: {
        type: Boolean,
        default: false
    }
}, { virtuals: true, collection: 'Properties' });

module.exports = mongoose.model("Properties", PropertiesSchema);