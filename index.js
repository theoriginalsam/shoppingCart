var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var config = require("./config/database");
var router = require("./Route/pages");
var adminRouter = require("./Route/admin-pages");
var bodyParser = require("body-parser");
var session = require("express-session");
var expressValidator = require("express-validator");
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

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  })
);

//messages
app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

app.use("/", router);
app.use("/sudo", adminRouter);

app.listen(config.PORT, (req, res) => {
  console.log(`Listening on PORT ${config.PORT}`);
});
