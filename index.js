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

app.get("/adminpage", async (req, res) => {
  try {
    const users = await User.find();
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


app.get("/admin-crud-update", (req, res) => {
  res.render("admin-crud-update", {
    title: "Admin Edit User",
    companyName: "Sunny Side Sandcastle",
  });
});

// Other routes...

app.post("/users", async (req, res) => {
  try {
    const { userID, firstName, lastName, email, phoneNumber } = req.body;
    await User.createNewUser(userID, firstName, lastName, email, phoneNumber);
    res.redirect("/thank-you");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});

// Other routes...

app.use(express.static("public"));

module.exports = app;
