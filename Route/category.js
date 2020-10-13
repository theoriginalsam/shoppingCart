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

Router.post("/add_category", (req, res) => {
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
        var category = new Categories({
          title,
          slug,
         
        });
        category.save((err) => {
          if (err) {
            return console.log("Error");
          }
          console.log("Successfully added");
          res.redirect("/categories");
        });
      }
    });
  }
});

Router.get("/edit_category/slug", function (req, res) {
  Pages.findById(new ObjectId(req.params.slug), function (err, page) {
    if (err) return console.log(err);

    res.render("admin/edit_category", {
      title: page.title,
      slug: page.slug,
      content: page.content,
      id: page._id,
    });
  });
});
module.exports = Router;
