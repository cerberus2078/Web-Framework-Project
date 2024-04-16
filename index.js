const express = require("express"); // Import Express
const exphbs = require("express-handlebars"); // Import Express-handlebars
const mongoose = require("mongoose");
require("dotenv").config(); // Import the dotenv

const app = express(); // Start the server by Creating the express module
app.use("", require("./routes/users")); // Import the router from the users file

// Connect to the mongodb database
// const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

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

// // Import the User schema
// const User = require("./models/User"); // SENT TO routers/users.js

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
/*
// GET ALL ITEMS IN THE DATABASE
const getAll = async () => {
  try {
    const result = await User.find();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// getAll();

// FIND ONE BY ID

app.get("/users/:userID", async (req, res) => {
  const userID = req.params.userID;
  const user = await User.findOne({ userID: userID });
  // const user2 = await User.findOne({ userID: 1 });
  res.json(user);
});

// // FIND ONE BY FIRSTNAME
app.get("/firstname/:userFirstName", async (req, res) => {
  const userFirstName = req.params.userFirstName;
  const user = await User.findOne({ firstName: userFirstName });
  // const user2 = await User.findOne({ userID: 1 });
  res.json(user);
});

*/
// // Find user by firstname function
// const getByFirstName = async (userFirstName) => {
//   try {
//     const result = await User.findOne({ firstName: userFirstName });
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

// getByFirstName("Edem");

// app.get("/users/:firstName", async (req, res) => {
//   const UserFirstName = req.params.firstName;
//   const user = await User.find({ firstName: UserFirstName });
//   res.json(user);
// });

// Specify default layout/ main template ie(main.handlebars)
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));

// Use handlebars as a template engine
app.set("view engine", "handlebars"); // Use handlebars as a template engine

// Render the homepage to the browser (Also set the title for that page)
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

// MOVED TO routes/users.js

// // Render the homepage to the browser (Also set the title for that page)
// app.get("/", (req, res) => {
//   res.render("index", {
//     title: "Home",
//     companyName: "Sunny Side Sandcastle",
//   });
// });

// const User = require("./models/User");

// Rendering the admin.handlebars file (Serve as a template for other pages)
app.get("/adminpage", (req, res) => {
  res.render("admin", {
    title: "Admin",
    companyName: "Sunny Side Sandcastle",
    // ADD OTHER ITEMS HERE FROM THE DATABASE. (products)
  });
});

// Set the folder for static files (css, jpg)
app.use(express.static("public"));

// When no page has been found (404 error)
// app.use((req, res, next) => {
//   res.status(404).render("404", {
//     title: "404 Error",
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
