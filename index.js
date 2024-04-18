const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const path = require('path');
require("dotenv").config();

const app = express();
const User = require("./models/User");

app.use(express.urlencoded({ extended: true }));

const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    companyName: "Sunny Side Sandcastle",
  });
});

// render the admin page
app.get("/adminpage", async (req, res) => {
  try {
    // added .lean() after User.find, and {} inside the User.find()
    // .lean() returns the JavaScript object instead of Mongoose document
    // https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
    const users = await User.find({}).lean();
    console.log("Fetched users:", users); // check if it reads the user data
    res.render("admin", {
      users: users,
      title: "Admin",
      companyName: "Sunny Side Sandcastle",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// blank page to update the user without the user id
app.get("/admin-crud-update", (req, res) => {
  res.render("admin-crud-update", {
    title: "Admin Edit User",
    companyName: "Sunny Side Sandcastle",
  });
});


// render the page of one user - working
app.get("/admin-crud-update/:id", async (req, res) => {
  try {
    const id = req.params.id; // it has to be req.params.user.ID, not req.params.id, because it will check the id from mongoose
    const user = await User.findOne({userID : id}).lean();
    if (!user) {
      console.log("User not found");
      res.status(404).send("User not found");
      return;
    }
    res.render("admin-crud-update", {
      title: "Update Page for User",
      user: user,
    });
    console.log(user); // DEBUGGING
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// app.post("/users", async (req, res) => {
//   try {
//     const { userID, firstName, lastName, email, phoneNumber } = req.body;
//     await User.createNewUser(userID, firstName, lastName, email, phoneNumber);
//     res.redirect("/thank-you");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error creating user");
//   }
// });

// for images and css
app.use(express.static("public"));

module.exports = app;
