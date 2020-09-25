var express = require("express");
var Router = express.Router();

Router.get("/", (req, res) => {
  res.render("/index", {
    title: "Home",
  });
});

module.exports = Router;
