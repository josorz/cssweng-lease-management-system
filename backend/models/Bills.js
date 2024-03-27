const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BillsSchema = new Schema({
    tenant_contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contracts',
        required: true
    },
    date_due: Date,
    bill_type: {
        type: String,
        enum: ['Penalty', 'Utility', 'Rent']
    },
    date_received: {
        type: Date,
        required: false
    },
    information: String,
    amount: Number,
    isWaived: {
        type: Boolean,
        default: false
    }
}, { collection: 'Bills' });
    
module.exports = mongoose.model("Bills", BillsSchema);