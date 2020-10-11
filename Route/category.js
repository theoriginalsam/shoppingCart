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
  
  res.render("admin/add_category", {
    title: title,
    slug: slug,
   
  });
});

Router.post("/add_pages", (req, res) => {
  req.checkBody("title", "must have a value").notEmpty();
  req.checkBody("slug", "must have a value").notEmpty();
  var title = req.body.title;
  var slug = req.body.slug;
  var errors = req.validationErrors();
  if (errors) {
    res.render("admin/add_category", {
      errors: errors,
      title: title,
      slug: slug,
     
    });
  } else {
    Categories.findOne({ slug: slug }, (err, category) => {
      if (category) {
        res.render("admin/add_category", {
          errors: errors,
          title: title,
          slug: slug,
        
        });
      } else {
        var page = new Pages({
          title,
          slug,
          content,
          sorting: 100,
        });
        page.save((err) => {
          if (err) {
            return console.log("Error");
          }
          console.log("Successfully added");
          res.redirect("/admin");
        });
      }
    });
  }
});
module.exports = Router;
