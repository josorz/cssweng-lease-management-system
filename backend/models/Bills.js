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
    status: {
        type: String,
        enum: ['Paid', 'Waived']
    },
}, { collection: 'Bills' });

BillsSchema.virtual('status').get(() => {
    this.status ? this.status : "Overdue"
})
    
module.exports = mongoose.model("Payments", BillsSchema);