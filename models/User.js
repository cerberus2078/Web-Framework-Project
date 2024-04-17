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
// GET ALL ITEMS IN THE DATABASE
const getAll = async () => {
  try {
    const result = await User.find();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// CREATE ONE BY USER_ID FUNCTION

const createNewUser = async (
  userID,
  firstName,
  lastName,
  email,
  phoneNumber
) => {
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
};

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
const updateUser = async (id, updateData) => {
  try {
    // Check if we have a product with the id
    const user = await User.findOne({ userID: id });
    if (user) {
      // Construct an object with only fields that require an update
      const dataToUpdate = {};
      if (updateData.firstName) dataToUpdate.firstName = updateData.firstName;
      if (updateData.lastName) dataToUpdate.lastName = updateData.lastName;
      if (updateData.email) dataToUpdate.email = updateData.email;
      if (updateData.phoneNumber)
        dataToUpdate.phoneNumber = updateData.phoneNumber;

      // Update user information where necessary
      await User.updateOne({ userID: id }, dataToUpdate);
      console.log("User Updated", dataToUpdate);
    }
  } catch (error) {
    console.log(error);
  }
};

// DELETE ONE BY USER_ID FUNCTION
const deleteOneUser = async (id) => {
  try {
    // Check if we have a product with the id
    const user = await User.findOne({ userID: id });
    if (user) {
      await User.deleteOne({ userID: id });
      console.log("User deleted", user); // DELETE THIS LATER replace with a res.render
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  User,
  createNewUser,
  getAll,
  getOneUser,
  updateUser,
  deleteOneUser,
};

