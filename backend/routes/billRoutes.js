const express = require('express');
const router = express.Router();
const billController = require('../controller/billController');

router.get('/get-bills', billController.getBills);
router.post('/edit-bill', billController.editBill);
router.post('/delete-bill', billController.deleteBill);
router.post('/create-bill', billController.createBill);

router.get('/get-financial-performance', billController.getFinancialPerformance);
router.get('/get-upcoming-bills', billController.getUpcomingBills);

module.exports = router;