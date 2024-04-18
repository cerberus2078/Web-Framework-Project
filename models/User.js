const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  // roomNumber: {
  //  type: String,
  //  required: false,
  // },
  // roomNumber: {
  //   type: String,
  //   required: false,
  // },
  // bookingDate: {
  //   type: String,
  //   required: false,
  // },
});

module.exports = mongoose.model("User", userSchema);
