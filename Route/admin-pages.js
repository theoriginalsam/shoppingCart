var express = require("express");
var Pages = require("../Model/pages");
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

Router.get("/edit_pages/:slug", async (req, res) => {
  var slugTou = req.params.slug;

  const Pagee = await Pages.findOne({ slug: slugTou }, (err, result) => {
    console.log(result);
    res.render("admin/edit_pages", {
      title: result.title,
      slug: "HEYEYE",
      content: "HEY",
      id: "12",
    });
  });
});
// post edit
Router.post("/edit_pages/", (req, res) => {
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
      if (page) {
        res.render("admin/edit_pages", {
          errors: errors,
          title: title,
          slug: slug,
          content: content,
        });
      } else {
        Pages.findById(id, (err, result) => {
          result.title = title;
          result.slug = slug;
          result.content = content;

          Pages.save((err) => {
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

module.exports = Router;
