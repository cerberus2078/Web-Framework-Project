const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

// Creating a 'users' module for hanlding routes for Users.

// Connect to the mongodb database
const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

// mongoose
//   .connect(dbURI)
//   .then((result) => {
//     const PORT = process.env.PORT || 5000; // Initializing the port to be used
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Confirmation of server running succcessfully
//     console.log("Connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

mongoose.connect(dbURI)

  // Import the User schema
const User = require("../models/User");

// TESTING ROUTER WITH DATABASE




router.get("/getone/:id", async (req, res) => {
    const id = req.params.id
    try {
      const user = await User.findOne({ userID: id });
      // res.json(user);
      console.log(user); // Change to send the data to the page
    } catch (error) {
      console.log(error);
    
  };

// Render the homepage to the browser (Also set the title for that page)
router.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    companyName: "Sunny Side Sandcastle",
  });
});

// I tried to fix the images but it didn't work
// app.get("/", (req, res) => {
//   imageList = [];
//   imageList.push({ src: "logo2.png", name: "logo2" });
//   res.render("index", {
//     imageList: imageList,
//     title: "Home",
//     companyName: "Sunny Side Sandcastle",
//   });
// });

// Rendering the admin.handlebars file (Serve as a template for other pages)
router.get("/adminpage", (req, res) => {
  res.render("admin", {
    title: "Admin",
    companyName: "Sunny Side Sandcastle",
    // ADD OTHER ITEMS HERE FROM THE DATABASE. (products)
  });
});

// admin edit users page
router.get("/admin-edit-user", (req, res) => {
  res.render("adminedit", {
    title: "Admin Edit User",
    companyName: "Sunny Side Sandcastle",
    // ADD OTHER ITEMS HERE FROM THE DATABASE. (products)
  });
});

// Adding users to the adminpage
router.get("/users", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get booking page information where the user puts their own information (CRUD -> CREATE)
router.get("/booking", (req, res) => {
  res.render("booking", {
    title: "Booking",
    companyName: "SSS",
  });
});

// Route for thank-you page
router.get("/thank-you", (req, res) => {
  res.render("thank-you", {
    title: "Thank You",
    companyName: "Sunny Side Sandcastle",
  });
  router;
});

// Export the router
module.exports = router;
