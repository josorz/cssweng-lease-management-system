const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MaintenanceSchema = new Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Properties',
        required: true
    },
    date: Date,
    description: String
}, { collection: 'PropertyMaintenance' });

module.exports = mongoose.model("PropertyMaintenance", MaintenanceSchema);