// Creating a 'users' module for hanlding routes for Users.

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
// Connect to the mongodb database
const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURI);

// Import the User schema
const User = require("../models/User");

// Render the homepage to the browser (Also set the title for that page)
router.get("/", (req, res) => {
  res.send("INDEX PAGE SHOWING HERE WITH MVC");
});

router.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.render("edem", {
      users: user.toJSON(),
    });
  } catch (err) {
    res.status(404).json({
      msg: "Not found",
    });
  }
});

// Route for finding one user by userID and rendering edem.handlebars
router.get("/edem/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ userID: id });
    res.render("edem", {
      users: user.toJSON(),
    });
  } catch (err) {
    res.status(404).json({
      msg: "Not found",
    });
  }
});

// Export the router
module.exports = router;
