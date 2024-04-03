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
    monthly_due: Number,
    tenant: {
        last_name: String,
        first_name: String,
        contact: Number, 
        email: String,
        id_picture: String
    },
    isTerminated: Boolean,
    terminated_date: Date,
    bills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bills' }]
}, { collection: 'Contracts' });

module.exports = mongoose.model("Contracts", ContractsSchema);