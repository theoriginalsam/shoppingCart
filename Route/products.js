var express = require("express");
var mkdirp = require('mkdirp')
var fs = require('fs-extra')
var resizeImg = require('resize-img')

var Product = require("../Model/product");
var Category = require("../Model/category");

var ObjectId = require("mongodb").ObjectID;


var Router = express.Router();







Router.get("/", (req, res) => {
    var count
  Product.count((err,c)=>{
      count = c
  })

  Product.find((err,products)=>{
      res.render("",{
          products,count
      })
  })
});
Router.get("/add_products", (req, res) => {
  var title = "";
  var price = "";
  
  var description = ""

  Category.find((err,categories)=>{

    res.render('admin/add_products',{

      title:title,
      price:price,
      description:description,
      categories:categories
    })
  })

});
Router.post("/add_products", (req, res) => {

  var imageFile = req.files.image !== "undefined" ? req.files.image.name: ""
  console.log(imageFile)
  req.checkBody("title", "must have a value").notEmpty();
  req.checkBody("price", "must have a value").notEmpty();
  req.checkBody("description", "must have a value").notEmpty();
  req.checkBody("categories", "must have a value").notEmpty();
  var title = req.body.title;
  var price = req.body.price;
  var description = req.body.description;
  
  var errors = req.validationErrors();
  console.log(errors)
  if (errors) {
    Category.find((err,categories)=>{
      //console.log("Category"+ categories)

      res.render('admin/add_products',{
  
        title:title,
        slug:slug,
        price:price,
        description:description,
        categories:categories
      })
    })
  } else {
    Product.findOne({ slug: slug }, (err, result) => {


      if (result) {
        console.log(result)
        Category.find((err,categories)=>{

          res.render('admin/add_products',{
      
            title:title,
            slug:slug,
            price:price,
            description:description,
            categories:categories
          })
        })
       
      } else {
       
        var product = new Product({
          title,
          slug,
          description,
          price,
          categories,
          image:imageFile
        });
        
        product.save((err) => {
          if (err) {
            return console.log("Error");
          }
          else{
            mkdirp("public/product_images/"+product._id , (err)=>{
              return console.log(err)
            })
            mkdirp("public/product_images/"+product._id+"/gallery", (err)=>{
              return console.log(err)
            })
            mkdirp("public/product_images/"+product._id+"/thumbs", (err)=>{
              return console.log(err)
            })

            if (imageFile !=""){
              var image=req.files.image
              var path = 'public/product_images/'+product._id+"/"+imageFile
              image.mv(path,(err)=>{
                console.log(err)
              })
            }
          }
          console.log("Successfully added");
          res.redirect("/products");
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
    } else console.log("Error");
  });
});

module.exports = Router;
