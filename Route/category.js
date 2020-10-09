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
// Router.get("/add_pages", (req, res) => {
//   var title = "";
//   var slug = "";
//   var content = "";
//   res.render("admin/add_pages", {
//     title: title,
//     slug: slug,
//     content: content,
//   });
// });
module.exports = Router;
