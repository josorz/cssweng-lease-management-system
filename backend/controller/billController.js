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

        const request = await Bills.create({
            tenant_contract,
            date_due,
            bill_type,
            date_received: '',
            information,
            amount,
        })

        res.status(500).send(request._id)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.addPenalty = async (req, res) => {
    try {
        const { tenant_contract, date_due, information, amount } = req.body;

        const request = await Bills.create({
            tenant_contract,
            date_due,
            bill_type: 'Penalty',
            date_received: '',
            information,
            amount,
        })

        res.status(500).send(request._id)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.addMisc = async (req, res) => {
    try {
        const { tenant_contract, date_due, information, amount } = req.body;

        const request = await Bills.create({
            tenant_contract,
            date_due,
            bill_type: 'Utility',
            date_received: '',
            information,
            amount,
        })

        res.status(500).send(request._id)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.editBill = async (req, res) => {
    try {
        const newBill = req.body;

        await Bills.updateOne({
            _id: req.params.id
        }, newBill)

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