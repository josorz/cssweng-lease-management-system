const express = require('express');
const router = express.Router();
const propertyController = require('../controller/propertyController');

// router.post('/edit-property', propertyController.editProperty);
// router.post('/delete-property', propertyController.deleteProperty);
// router.post('/create-property', propertyController.createProperty);
router.get('/get-properties', propertyController.getProperties);

module.exports = router;