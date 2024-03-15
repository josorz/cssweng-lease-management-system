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

const MaintenanceSchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Properties',
        required: true
    },
    date: Date,
    description: String
}, { collection: 'PropertyMaintenance' });

const ContractsSchema = new mongoose.Schema({
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

const TenantsSchema = new mongoose.Schema({
    last_name: String,
    first_name: String,
    contact: Number, 
    email: String,
    id_picture: String
}, { collection: 'Tenants' });

const PaymentsSchema = new mongoose.Schema({
    tenant_contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contracts',
        required: true
    },
    date_received: Date,
    date_due: Date,
    information: String,
    amount: Number,
    status: String,
}, { collection: 'Payments' });


module.exports = mongoose.model("Properties", PropertiesSchema);