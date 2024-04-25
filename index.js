const express = require("express"); // Import Express
const exphbs = require("express-handlebars"); // Import Express-handlebars
const mongoose = require("mongoose");
require("dotenv").config(); // Import the dotenv

const app = express(); // Start the server by Creating the express module

app.use(express.urlencoded({ extended: true })); // Get the data of the form to be able to parse and use it

// Parse incoming request bodies in JSON format
app.use(express.json());

// Use the route module
app.use("", require("./routes/users"));
app.use("", require("./routes/admins"));

// Specify default layout/ main template ie(main.handlebars)
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));

// Use handlebars as a template engine
app.set("view engine", "handlebars"); // Use handlebars as a template engine

///////////// -- EDEM'S PLAYGROUNG -- ////////////////////
// const User = require("./models/Admin"); // MAYBE DELETE LATER
// Admin.createNewAdmin({
//   adminID: 1,
//   firstName: "Edem",
//   lastName: "Q",
//   email: "edem@sunnysidesandcastle.com",
//   password: "password",
// });
///////////// -- END OF EDEM'S PLAYGROUNG -- ///////////////

// Set the folder for static files (css, jpg, png)
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
