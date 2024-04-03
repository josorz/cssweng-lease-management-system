const express = require('express');
const router = express.Router();
const contractController = require('../controller/contractController');
const upload = require('../middleware/multerStorage');

router.get('/get-contracts/:propertyId?', contractController.getContracts);
router.get('/get-active-contracts/', contractController.getActiveContracts);
router.get('/get-contract/:id', contractController.getContract);
router.post('/edit-contract', contractController.editContract);
router.post('/delete-contract', contractController.deleteContract);
router.post('/create-contract', upload.single('image'), contractController.createContract);
router.get('/get-occupancy-chart', contractController.getOccupancyChart);
router.get('/get-rent-tracker', contractController.getRentTracker);

module.exports = router;