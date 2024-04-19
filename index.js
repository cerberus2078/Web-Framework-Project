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

// Set the folder for static files (css, jpg)
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
