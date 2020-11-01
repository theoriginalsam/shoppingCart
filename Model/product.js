var mongoose = require("mongoose");

// Page Schema
var PageSchema = mongoose.Schema({
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
  sorting: {
    type: Number,
  },
});

var Product = (module.exports = mongoose.model("Product", ProductSchema));
