var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var config = require("./config/database");

mongoose.connect(config.database, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var app = express();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to Mongoose");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(config.PORT, (req, res) => {
  console.log(`Listening on PORT ${config.PORT}`);
});
