const express = require('express');
const router = express.Router();
const propertyController = require('../controller/propertyController');
const upload = require('../middleware/multerStorage');

router.post('/edit-property', propertyController.editProperty);
router.post('/delete-property', propertyController.deleteProperty);
router.post('/create-property', upload.single('image'), propertyController.createProperty);
router.get('/get-properties', propertyController.getProperties);
router.get('/get-property/:id', propertyController.getProperty);

module.exports = router;