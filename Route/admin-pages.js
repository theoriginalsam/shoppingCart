var express = require("express");
var Router = express.Router();
Router.get("/pages", (req, res) => {
  res.send("HEY you are in right place");
});
Router.get("/add_pages", (req, res) => {
  var title = "";
  var slug = "";
  var content = "";
  res.render("admin/add_pages", {
    title: title,
    slug: slug,
    content: content,
  });
});

module.exports = Router;
