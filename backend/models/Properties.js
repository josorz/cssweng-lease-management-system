const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

const PropertiesSchema = new mongoose.Schema({
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

PropertiesSchema.virtual("name_line1").get(function () {
    if (this.nickname)
        return this.nickname
    else
        return `${this.loc_number} ${this.loc_street}`
})

PropertiesSchema.virtual("name_line2").get(function () {
    if (this.nickname)
        return `${this.loc_number} ${this.loc_street}`
    else
        return `${this.loc_barangay} ${this.loc_city}`
})

module.exports = mongoose.model("Properties", PropertiesSchema);