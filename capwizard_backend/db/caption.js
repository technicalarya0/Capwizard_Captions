const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  userId: String,
  name: String,
  catagory: String,
  company: String,
  price: String,
});

const captionSchema = new mongoose.Schema({
  userId: String,
  name: String,
  platform: String,
  mood: String,
  length: String,
  caption: String,
});
module.exports = mongoose.model("caption", captionSchema);
