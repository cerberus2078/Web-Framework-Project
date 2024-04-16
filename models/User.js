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
});

const User = mongoose.model("User", userSchema);

// Database Functions Here (CRUD)

// CREATE ONE BY USER_ID FUNCTION

// READ ONE BY userID FUNCTION
const getOneUser = async (id) => {
  try {
    const user = await User.findOne({ userID: id });
    // res.json(user);
    console.log(user); // Change to send the data to the page
  } catch (error) {
    console.log(error);
  }
};

// UPDATE ONE BY USER_ID function

// DELETE ONE BY USER_ID FUNCTION

module.exports = { User, getOneUser };
