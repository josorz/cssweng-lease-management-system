const Image = require("../models/Images");
const path = require("path"); //for single specific Image
const fs = require('fs'); //for single specific Image

// https://medium.com/@hassaanistic/image-handeling-using-multer-in-react-d7fea28e8dc6

uploadImage = async (file) => {
  try {
    // Create an Image model instance.
    const image = new Image({
      name: file.filename,
      imageId: file.id,
    });

    // Save the Image model instance to the database.
    const savedImage = await image.save();
    console.log(savedImage)

    // Set the imageUrl based on your server URL and the image ID
    savedImage.imageUrl = `/api/images/${savedImage._id}`;
    //this is for getting the image from the database

    // Save the updated Image model
    const response = await savedImage.save();
    console.log(response)

    return response;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { uploadImage }