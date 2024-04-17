const express = require("express"); // Import Express
const exphbs = require("express-handlebars"); // Import Express-handlebars
const mongoose = require("mongoose");
require("dotenv").config(); // Import the dotenv

const app = express(); // Start the server by Creating the express module

app.use(express.urlencoded({ extended: false })); // Get the data of the form to be able to pass and use it

// Connect to the mongodb database
const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(dbURI)
  .then((result) => {
    const PORT = process.env.PORT || 5000; // Initializing the port to be used
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Confirmation of server running succcessfully
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// Import the User schema
const User = require("./models/User");

// USER CRUD FUNCTIONS
// User.createNewUser(5, "Final", "Fantasy", "final@fantasy.com", "+3581234567");
// User.getOneUser(2);
// User.getAll();
// User.getOneUser(20); // checking a person with id 20 for testing purposes
// User.updateOneUser(20, "JoeJoe", "Dane", "danedane@gmail.com", "+8932048230"); // change the variables to see the result

// Specify default layout/ main template ie(main.handlebars)
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));

// Use handlebars as a template engine
app.set("view engine", "handlebars"); // Use handlebars as a template engine

// Render the homepage to the browser (Also set the title for that page)
app.get("/", (req, res) => {
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
app.get("/adminpage", (req, res) => {
  res.render("admin", {
    title: "Admin",
    companyName: "Sunny Side Sandcastle",
    // ADD OTHER ITEMS HERE FROM THE DATABASE. (products)
  });
});

// admin edit users page
app.get("/admin-edit-user", (req, res) => {
  res.render("adminedit", {
    title: "Admin Edit User",
    companyName: "Sunny Side Sandcastle",
    // ADD OTHER ITEMS HERE FROM THE DATABASE. (products)
  });
});

// Adding users to the adminpage
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get booking page information where the user puts their own information (CRUD -> CREATE)
app.get("/booking", (req, res) => {
  res.render("booking", {
    title: "Booking",
    companyName: "SSS",
  });
});

// Route for thank-you page
app.get("/thank-you", (req, res) => {
  res.render("thank-you", {
    title: "Thank You",
    companyName: "Sunny Side Sandcastle",
  });
});

// Route for creating the user and sending them to a thank you page where they can still edit/delete their information (if we have time to implement it)
app.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.redirect("/thank-you");
});

// Set the folder for static files (css, jpg)
app.use(express.static("public"));

/*
// When no page has been found (404 error)
app.use((req, res, next) => {
  res.status(404).render("404", {
    title: "404 Error",
  });
});
*/
