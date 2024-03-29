const mongoose = require('mongoose')
const Bills = require('../models/Bills')
const { computeRentBilling } = require('../utils/computeRentBilling')

// GET req for list of all posts.
exports.getBills = async (req, res) => {
    try {
        const bills = await Bills.find({})
            .populate('tenant_contract', 'tenant.last_name tenant.first_name property')
            .exec()

        res.status(200).json(bills);
    } catch (err) {
        res.status(500).send('Error')
    }
}

exports.createBill = async (req, res) => {
    try {
        const { tenant_contract, date_due, information, bill_type, amount } = req.body;

        const create = await Bills.create({
            tenant_contract,
            date_due,
            bill_type,
            date_received: '',
            information,
            amount,
        })

        const response = await Bills.findOne({_id: create._id}).populate('tenant_contract', 'tenant.last_name tenant.first_name property')

        res.status(500).json(response)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.editBill = async (req, res) => {
    try {
        const newBill = req.body;

        await Bills.updateOne({
            _id: req.body.id
        }, { $set: newBill})

        res.status(200).send(`[${req.params.id}] Bill edited!`)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.getBill = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            res.status(404).send('Bill does not exist')
        }
        const Bills = await Bills.findOne({_id: id})
        const bills = await Bills.find({tenant_Bill: id})
        res.status(200).json({...Bills, bills: [...bills]})
    } catch (err) {
        res.status(500).send('Error')
    }
}

exports.deleteBill = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            res.status(404).send('Bill does not exist')
        }
        await Bills.findByIdAndDelete({_id: id}).exec()
        res.status(200).send(`Successfully deleted Bill ${id}`)
    } catch (err) {
        res.status(500).send('Error')
    }
}

exports.getFinancialPerformance = async (req, res) => {
    try {
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    
        const query = await Bills.aggregate([
            {
                $match: {
                    date_received: { $gte: twoWeeksAgo }
                }
            },
            {
                $group: {
                _id: null,
                totalAmount: { $sum: '$amount' } // assuming 'amount' is the field containing the bill amount
                }
            }
            ]).exec();
        const totalAmount = query.length > 0 ? query[0].totalAmount : 0;
        
        res.status(200).json({totalAmount})
    } catch (err) {
        res.status(500).send(err)   
    }
}

exports.getUpcomingBills = async (req, res) => {
    try {
        const currentDate = new Date();

        // Query upcoming bills
        const upcomingBills = await Bills.find({
            date_received: null,
            date_due: { $gte: currentDate } // Select bills where date_due is greater than or equal to the current date
        }).populate('tenant_contract', 'tenant.last_name')
        .sort({date_due: 1})
        .exec();

        // Send the upcoming bills as JSON response
        res.status(200).json(upcomingBills);
    } catch (err) {
        res.status(500).send('Error')
    }
}