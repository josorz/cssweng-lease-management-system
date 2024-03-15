const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentsSchema = new Schema({
    tenant_contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contracts',
        required: true
    },
    date_received: Date,
    date_due: Date,
    information: String,
    amount: Number,
    status: {
        type: String,
        enum: ['Paid', 'Waived', 'Overdue']
    },
}, { collection: 'Payments' });


module.exports = mongoose.model("Payments", PaymentsSchema);