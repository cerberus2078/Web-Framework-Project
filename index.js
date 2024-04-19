const express = require("express"); // Import Express
const exphbs = require("express-handlebars"); // Import Express-handlebars
const mongoose = require("mongoose");
require("dotenv").config(); // Import the dotenv

const app = express(); // Start the server by Creating the express module

// Use the route module
app.use("", require("./routes/users"));

// Specify default layout/ main template ie(main.handlebars)
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));

// Use handlebars as a template engine
app.set("view engine", "handlebars"); // Use handlebars as a template engine

///////////// -- EDEM'S PLAYGROUNG -- ////////////////////

// render the admin page
app.get("/adminpage", async (req, res) => {
  try {
    // added .lean() after User.find, and {} inside the User.find()
    // .lean() returns the JavaScript object instead of Mongoose document
    // https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
    const users = await User.find({}).lean();
    // console.log("Fetched users:", users); // check if it reads the user data, debugging
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

// sumit (POST) the firstName to the database to update, later on needs to be changed to check-in and check-out dates
app.post("/adminpage", async (req, res) => {
  try {
    const { userID, firstName } = req.body;
    if (!userID) {
      return res.status(400).send("User ID (userID) is required");
    }
    // Update only the firstName field for the user with the given userID
    await User.findOneAndUpdate({ userID }, { firstName });
    res.redirect("/adminpage");
  } catch (error) {
    console.error(error);
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
    const id = req.params.id;
    const user = await User.findOne({ userID: id }).lean();
    if (!user) {
      console.log("User not found");
      res.status(404).send("User not found");
      return;
    }
    res.render("admin-crud-update", {
      title: "Update Page for User",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

///////////// -- END OF EDEM'S PLAYGROUNG -- ///////////////

// Set the folder for static files (css, jpg)
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
