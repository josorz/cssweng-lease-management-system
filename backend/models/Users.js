const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    isActivated: Boolean
}, { collection: 'Users' });

const user = mongoose.model('Users', userSchema);

module.exports = user;