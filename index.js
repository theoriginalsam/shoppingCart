var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://samir:samir@cluster0.sj8rp.mongodb.net/cart?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

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

var PORT = 3000;
app.listen(PORT, (req, res) => {
  console.log(`Listening on PORT`);
});
