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

// UPDATE ONE BY userID function

const updateOneUser = async (
  userID,
  firstName,
  lastName,
  email,
  phoneNumber
) => {
  try {
  const updatedUser = await User.findOneAndUpdate(
    { userID: userID}, 
    {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber
    
  }, 
  {new: true});
  console.log(updatedUser);
} catch (error){
  console.error(error);
}
};


// DELETE ONE BY USER_ID FUNCTION

module.exports = { User, createNewUser, getAll, getOneUser, updateOneUser };
