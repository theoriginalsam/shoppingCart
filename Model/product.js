var mongoose = require("mongoose");

// Product Schema
var ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  image:{
    type:string
  }

  

});

var Product = (module.exports = mongoose.model("Product", ProductSchema));
