const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const path = require('path');
const bodyparser = require('body-parser');
require("dotenv").config();

const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json()); // convert data into json

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

// Handle form submission for updating or creating a user
// app.post("/adminpage", async (req, res) => {
//   try {
//     const { _id, firstName } = req.body; // Only need userID and firstName for updating
//     if (!_id) {
//       // Create a new user if userID is not provided
//       const { lastName, email, phoneNumber } = req.body; // Destructure other fields
//       const newUser = new User({ firstName, lastName, email, phoneNumber });
//       await newUser.save();
//     } else {
//       // Update an existing user if userID is provided
//       await User.findOneAndUpdate(
//         { userID },
//         { firstName } // Update only the firstName field
//       );
//     }
//     res.redirect("/adminpage");
//   } catch (error) {
//     console.error(error);
//     // res.status(500).send("Server Error");
//   }
// });

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

// load style for admin-crud-update/:id
// Serve CSS files specifically for /admin-crud-update route

// for images and css
app.use(express.static("public"));

module.exports = app;
