const express = require("express");
const router = express.Router(); // Needed when using the routes file system structure. (Helps us organize the routes/http methods in their own modules)
// const mongoose = require("mongoose");
// const exphbs = require("express-handlebars");
// require("dotenv").config();

// Connect to the mongodb database
// const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;
// mongoose.connect(dbURI);
// Import the User schema
// const User = require("../models/User");

const userController = require("../controllers/userController");

// Render the homepage to the browser (Also set the title for that page)
// router.get("/", userController.getHome);
router.get("/users/:UserID", userController.getUserDetails);
router.get("/firstname/:userFirstName", userController.getUserByFirstName);
router.get("/user/:id", userController.getUserDetails);
router.get("/users/customers", userController.getAll);

/* 
// HARDCODED NEW USER (DELETE LATER)
const newUser = new User({
  userID: 2,
  firstName: "Second Edem",
  lastName: "Reinhardt",
  email: "brian1972@gmail.com",
  phoneNumber: "+358040009328",
});

// SAVE THE NEW USER TO THE DATABASE 
newUser
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
*/
/*
// Getting all the items in the database
User.find().then((result) => {
  console.log(result);
});
*/

// GET ALL ITEMS IN THE DATABASE
// const getAll = async () => {
//   try {
//     const result = await User.find();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

// getAll();

// FIND ONE BY ID

// router.get("/users/:userID", async (req, res) => {
//   const userID = req.params.userID;
//   const user = await User.findOne({ userID: userID });
//   // const user2 = await User.findOne({ userID: 1 });
//   res.json(user);
// });

// // FIND ONE BY FIRSTNAME
// router.get("/firstname/:userFirstName", async (req, res) => {
//   const userFirstName = req.params.userFirstName;
//   const user = await User.findOne({ firstName: userFirstName });
//   // const user2 = await User.findOne({ userID: 1 });
//   res.json(user);
// });

module.exports = router;
