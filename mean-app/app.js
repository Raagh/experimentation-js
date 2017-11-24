const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const users = require("./routes/users");
const config = require('./config/database');

//Connect to DB
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to the database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('database error: ' + err);
});


const app = express();

//Port Number
const port = 3000;

//CORS middleware
app.use(cors());

//Body Parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use("/users", users);

//Index Route
app.get("/", (req, res) => {
    res.send("Invalid Endpoint");
});

//Start Server
app.listen(port, () => {
    console.log("Server started on port " + port);
});