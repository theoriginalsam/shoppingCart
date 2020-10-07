var express = require("express");
var Pages = require("../Model/pages");
var ObjectId = require("mongodb").ObjectID;
var Router = express.Router();
Router.get("/", (req, res) => {
  Pages.find({})
    .sort({ sorting: 1 })
    .exec((err, pages) => {
      res.render("admin/pages", {
        pages: pages,
      });
    });
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
Router.post("/add_pages", (req, res) => {
  req.checkBody("title", "must have a value").notEmpty();
  req.checkBody("content", "must have a value").notEmpty();
  var title = req.body.title;
  var slug = req.body.slug;
  var content = req.body.content;
  var errors = req.validationErrors();
  if (errors) {
    res.render("admin/add_pages", {
      errors: errors,
      title: title,
      slug: slug,
      content: content,
    });
  } else {
    Pages.findOne({ slug: slug }, (err, page) => {
      if (page) {
        res.render("admin/add_pages", {
          errors: errors,
          title: title,
          slug: slug,
          content: content,
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

//get edit page

Router.get("/edit_pages/:id", function (req, res) {
  Pages.findById(new ObjectId(req.params.id), function (err, page) {
    if (err) return console.log(err);

    res.render("admin/edit_pages", {
      title: page.title,
      slug: page.slug,
      content: page.content,
      id: page._id,
    });
  });
});
// post edit
Router.post("/edit_pages/:id", (req, res) => {
  req.checkBody("title", "must have a value").notEmpty();
  req.checkBody("content", "must have a value").notEmpty();
  var title = req.body.title;
  var slug = req.body.slug;
  var content = req.body.content;

  var errors = req.validationErrors();
  if (errors) {
    res.render("admin/edit_pages", {
      errors: errors,
      title: title,
      slug: slug,
      content: content,
      id: id,
    });
  } else {
    Pages.findOne({ slug: slug }, (err, result) => {
      console.log(result);
      if (result) {
        res.render("admin/edit_pages", {
          errors: errors,
          title: title,
          slug: slug,
          content: content,
        });
      } else {
        Pages.findById(req.params.id, (err, result) => {
          result.title = title;
          result.slug = slug;
          result.content = content;

          result.save((err) => {
            if (err) {
              return console.log("Error");
            }
            console.log("Successfully added");
            res.redirect("/admin");
          });
        });
      }
    });
  }
});

Router.get("/delete_pages/:id", (req, res) => {
  Pages.findByIdAndRemove(req.params.id, (err, result) => {
    if (result) {
      console.log("Deleted" + result);
      res.redirect("/admin");
    } else console.log("error");
  });
});

module.exports = Router;
