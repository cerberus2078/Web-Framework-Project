const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String
});

module.exports = mongoose.model("Users", usersSchema);