const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  contentType: String,
  imageUrl: String, // Store the image URL here ->// we can fetch the image from databse using this 
  // Add any other fields you need for your image
}, { collection: 'Images' });


module.exports = mongoose.model('Image', imageSchema);