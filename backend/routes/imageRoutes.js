const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerStorage'); // Import the multer middleware
const {postingImage ,singleImage } = require('../controller/imageController'); // Import the image controller

router.post('/upload', upload.single('image'), postingImage); // Call the imageController.uploadImage function
router.route('/:id').get(singleImage)

module.exports = router;