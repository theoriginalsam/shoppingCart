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
  req.checkBody("price", "must have a value").isDecimal();
  req.checkBody("description", "must have a value").notEmpty();

  var title = req.body.title;

  var price = req.body.price;
  
  var description = req.body.description;
 
  
  var category=req.body.category
  console.log(category)
  
  var slug  =title
  
  var errors = req.validationErrors();
  console.log(errors)
  if (errors) {
    Category.find((err,categories)=>{
      

      res.render('admin/add_products',{
  
        title:title,
        price:price,
        description:description,
        categories:categories
      })
    })
  } else {
    console.log('here')
    Product.findOne({ title: title }, (err, result) => {

      console.log(result)
      if (result) {
       
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
       console.log("I am here")
       console.log(category)

        var product = new Product({
          title:title,
          slug:title,
          description:description,
          price:price,
        category:category,
          image:imageFile
        });
        console.log(product)
        product.save((err) => {
          if (err) {
            return console.log("Error");
          }
          else{
            //place your directory in here
            mkdirp('directory').then(made =>
              console.log(`made directories, starting with`))
            
            // mkdirp(`` , (err)=>{
            //   return console.log("here is error")
            // })
            // mkdirp("public/product_images/"+product._id+"/gallery", (err)=>{
            //   return console.log(err)
            // })
            // mkdirp("public/product_images/"+product._id+"/thumbs", (err)=>{
            //   return console.log(err)
            // })
            //some thing is wrong here 

          //   if (imageFile !=""){
          //     var image=req.files.image

          //     var path = 'public/product_images/'+product._id+"/"+imageFile
          //     image.mv(path,(err)=>{
          //       console.log(err)
          //     })
          //   }
          // }
          //need to understand this part
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
