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

// Set the folder for static files (css, jpg, png)
app.use(express.static("public"));

function confirmDelete(userID) {
  if (confirm("Are you sure you want to delete this reservation?")) {
    fetch(`/admin-crud-update/delete/${userID}?_method=DELETE`, {
      method: "POST", // Use POST method as method-override is enabled
    })
      .then((response) => {
        if (response.ok) {
          console.log("User deleted successfully");
          location.reload(); // Reload the page after successful deletion
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete user");
      });
  } else {
    console.log("Reservation was not deleted");
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
