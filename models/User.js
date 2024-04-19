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

const User = mongoose.model("User", userSchema);

// Database Functions Here (CRUD)

// CREATE ONE BY USER_ID FUNCTION

const createNewUser = async (
  userID,
  firstName,
  lastName,
  email,
  phoneNumber
) => {
  try {
    const newUser = new User({
      userID: userID,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    });
    newUser.save().then((result) => {
      console.log(result);
    });
  } catch (error) {
    console.log(error);
  }
};

// GET ALL ITEMS IN THE DATABASE
const getAllUsers = async () => {
  try {
    const users = await User.find().lean();
    // console.log(users);
    return users;
  } catch (error) {
    console.log(error);
  }
};

// READ ONE BY userID FUNCTION
const getOneUser = async (id) => {
  try {
    const user = await User.findOne({ userID: id });
    // res.json(user);
    // console.log(user); // Change to send the data to the page
    return user;
    // return user.toJSON();
  } catch (error) {
    console.log(error);
  }
};

const updateOneUser = async (id, updateData) => {
  try {
    const updatedUser = await User.findOneAndUpdate(id, updateData, {
      new: true,
    });
    // console.log(updatedUser);
  } catch (error) {
    console.error(error);
  }
};

// Export
// module.exports = mongoose.model("User", userSchema);
// module.exports = { User, getOneUser };
module.exports = { createNewUser, getAllUsers, getOneUser, updateOneUser };
