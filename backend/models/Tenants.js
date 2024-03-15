const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TenantsSchema = new Schema({
    last_name: String,
    first_name: String,
    contact: Number, 
    email: String,
    id_picture: String
}, { collection: 'Tenants' });

module.exports = mongoose.model("Tenants", TenantsSchema);