var express = require("express");
var Categories = require("../Model/category");
var ObjectId = require("mongodb").ObjectID;
var Router = express.Router();
Router.get("/", (req, res) => {
  Categories.find({}).exec((err, categories) => {
    res.render("admin/categories", {
      categories: categories,
    });
  });
});
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
