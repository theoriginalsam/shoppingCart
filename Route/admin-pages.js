var express = require("express");
var Router = express.Router();

Router.get("/admin", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

module.exports = Router;
