const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContractsSchema = new Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Properties',
        required: true
    },
    date_start: Date,
    date_end: Date,
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenants',
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Terminated', 'Completed']
    }
}, { collection: 'Contracts' });

module.exports = mongoose.model("Contracts", ContractsSchema);