const express = require("express"); // Import Express
const exphbs = require("express-handlebars"); // Import Express-handlebars
const mongoose = require("mongoose");
require("dotenv").config(); // Import the dotenv

const app = express(); // Start the server by Creating the express module

app.use(express.urlencoded({extended: false})); // Get the data of the form to be able to pass and use it

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
const User = require("./models/users");

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
  const id = req.params.userID;
  const user = await User.findById(userID);
  const user2 = await User.find(userID);
  res.json(user2);
});

// // FIND ONE BY FIRSTNAME

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

// Render the homepage to the browser (Also set the title for that page)
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    companyName: "Sunny Side Sandcastle",
  });
});

// Rendering the admin.handlebars file (Serve as a template for other pages)
app.get("/adminpage", (req, res) => {
  res.render("admin", {
    title: "Admin",
    companyName: "Sunny Side Sandcastle",
    // ADD OTHER ITEMS HERE FROM THE DATABASE. (products)
  });
});

// Adding users to the adminpage
app.get('/users', async (req,res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});


// Get booking page information where the user puts their own information (CRUD -> CREATE)
app.get('/booking', (req,res) => {
  res.render('booking',
  {
      title:'Booking',
      companyName: 'SSS'
  }
  );
});

// Route for thank-you page
app.get('/thank-you', (req, res) => {
  res.render('thank-you', {
    title: 'Thank You',
    companyName:'Sunny Side Sandcastle'
  });
});

// Route for creating the user and sending them to a thank you page where they can still edit/delete their information (if we have time to implement it)
app.post('/users', async (req,res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.redirect('/thank-you');
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




