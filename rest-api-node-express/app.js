const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const api = require("./routes/api");

const app = express();

//Port Number
const port = 3000;

//Body Parser middleware
app.use(bodyParser.json());

app.use("/api", api);

//Index Route
app.get("/", (req, res) => {
    res.send("Invalid Endpoint");
});

//Start Server
app.listen(port, () => {
    console.log("Server started on port " + port);
});