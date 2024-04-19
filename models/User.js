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

// UPDATE ONE BY USER_ID function
const updateUserOld = async (id, updateData) => {
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

// NEW UPDATE FUNCTION WITH findOneAndUpdate
// const updateUser = async (id, updateData) => {
//   try {
//     const id = req.params.id;
//     const updateData = req.body;

//     const updatedUser = await User.findOneAndUpdate(
//       { userID: id },
//       updateData,
//       { new: true }
//     );

//     // Check if the user was found and updated
//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Return the updated user as a JSON response
//     res.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const updateUser = async (id, updateData) => {
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { userID: id },
//       updateData,
//       {
//         new: true,
//       }
//     );
//     // Check if the user was found and updated
//     //     if (!updatedUser) {
//     //       return res.status(404).json({ error: "User not found" });
//     //     }

//     //     // Return the updated user as a JSON response
//     //     res.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     //   res.status(500).json({ error: "Internal server error" });
//   }
// };

const updateOneUser = async (id, updateData) => {
  try {
    const updatedUser = await User.findOneAndUpdate(id, updateData, {
      new: true,
    });
  } catch (error) {
    console.error(error);
  }
};

// Export
// module.exports = mongoose.model("User", userSchema);
// module.exports = { User, getOneUser };
module.exports = { createNewUser, getAllUsers, getOneUser, updateOneUser };
