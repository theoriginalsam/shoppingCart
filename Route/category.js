var express = require("express");
var Categories = require("../Model/category");
var ObjectId = require("mongodb").ObjectID;
var Router = express.Router();
Router.get("/", (req, res) => {
  Categories.find({}, (err, categories) => {
    res.render("admin/categories", {
      categories: categories,
    });
  });
});
//edit and delete are currently via database
//and will be implemented at last
Router.get("/add_category", (req, res) => {
  var title = "";
  var slug = "";
  
  res.render("admin/", {
    title: title,
    slug: slug,
   
  });
});
module.exports = Router;
