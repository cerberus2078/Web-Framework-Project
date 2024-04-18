const express = require("express"); // Import Express
const exphbs = require("express-handlebars"); // Import Express-handlebars
const mongoose = require("mongoose");
require("dotenv").config(); // Import the dotenv

const app = express(); // Start the server by Creating the express module
// app.use("", require("./routes/users"));

// Specify default layout/ main template ie(main.handlebars)
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));

// Use handlebars as a template engine
app.set("view engine", "handlebars"); // Use handlebars as a template engine

// Connect to the mongodb database
const dbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURI);

// Import the User schema
const User = require("./models/User");

// Render the homepage to the browser (Also set the title for that page)
app.get("/", (req, res) => {
  res.send("INDEX PAGE SHOWING HERE WITH MVC");
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.render("edem", {
      users: user.toJSON(),
    });
  } catch (err) {
    res.status(404).json({
      msg: "Not found",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
