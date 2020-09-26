var express = require("express");
var Router = express.Router();

Router.get("/add_pages", (req, res) => {
  var title = "";
  res.render("admin/add_pages", {
    title: "Add a page",
  });
});

module.exports = Router;
