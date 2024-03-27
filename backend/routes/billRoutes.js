const express = require('express');
const router = express.Router();
const billController = require('../controller/billController');

router.get('/get-bills', billController.getBills);
router.post('/edit-bill', billController.editBill);
router.post('/delete-bill', billController.deleteBill);
router.post('/create-bill', billController.createBill);

module.exports = router;