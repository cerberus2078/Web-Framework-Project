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
  checkIn: {
    type: String,
    required: true,
  },
  checkOut: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

// Database Functions Here (CRUD)

// CREATE ONE BY USER_ID FUNCTION

const createNewUser = (userData) => {
  try {
    const newUser = new User(userData);
    newUser.save();
  } catch (error) {
    console.log(error);
  }
};

// GET ALL ITEMS IN THE DATABASE
const getAllUsers = async () => {
  try {
    const users = await User.find().lean();
    return users;
  } catch (error) {
    console.log(error);
  }
};

// READ ONE BY userID FUNCTION
const getOneUser = async (id) => {
  try {
    const user = await User.findOne({ userID: id });
    return user;
  } catch (error) {
    console.log(error);
  }
};

// UPDATE ONE BY USER_ID function
const updateOneUser = async (id, updateData) => {
  try {
    const updatedUser = await User.findOneAndUpdate(id, updateData, {
      new: true,
    });
  } catch (error) {
    console.error(error);
  }
};

// DELETE ONE BY USER_ID FUNCTION
const deleteOneUser = async (id) => {
  try {
    const deletedUser = await User.findOneAndDelete({ userID: id });
  } catch (err) {
    console.log(err);
  }
};

// Export
module.exports = {
  createNewUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  deleteOneUser,
};
