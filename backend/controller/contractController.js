const mongoose = require('mongoose')
const Contracts = require('../models/Contracts')
const Bills = require('../models/Bills')
const { computeRentBilling } = require('../utils/computeRentBilling')

// GET req for list of all posts.
exports.getContracts = async (req, res) => {
    try {
        const propertyId = req.params.propertyId
        let contracts
        if (!propertyId) {
            contracts = await Contracts.find({}, 'date_start date_end tenant.last_name')
                        .sort('-date_end')
                        .exec()
        } else {
            contracts = await Contracts.find({property: propertyId}, 'date_start date_end tenant.last_name')
                    .sort('-date_end')
                    .exec()
            if (contracts.length > 0) {
                const latestContact = contracts[0]
                if (latestContact.date_end > Date.now())
                    contracts = {contracts: [...contracts], currContract: latestContact._id}
                else
                    contracts = {contracts: [...contracts], currContract: null}
            }
        }
        res.status(200).json(contracts);
    } catch (err) {
        res.status(500).send('Error')
    }
}

exports.createContract = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { date_start, date_end, monthly_due } = req.body
        const newContract = req.body

        const entry = await Contracts.create([newContract], { session: session })
        const contractId = entry[0]._id

        // use computeRentBilling in /utils to compute for the rent
        // then create() the resulting bills in the Bills schema

        const bills = computeRentBilling(date_start, date_end, monthly_due)

        // Create insert promises for each bill
        const promises = bills.map(async (bill) => {
            await Bills.create([{
                tenant_contract: contractId,
                ...bill,
                status: 'Unpaid'
            }], { session: session })
        })
        await Promise.all(promises)

        await session.commitTransaction();
        session.endSession();

        res.status(200).send(contractId)
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).send(err.message)
    }
}

exports.editContract = async (req, res) => {
    try {
        const newContract = req.body;

        await Contracts.updateOne({
            _id: req.params.id
        }, newContract)

        res.status(200).send(`[${req.params.id}] contract edited!`)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.getContract = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            res.status(404).send('Contract does not exist')
        }
        const contracts = await Contracts.findOne({_id: id})
            .populate('property')
            .exec()
        res.status(200).json(contracts)
    } catch (err) {
        res.status(500).send('Error')
    }
}

exports.deleteContract = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            res.status(404).send('Contract does not exist')
        }
        await Contracts.findByIdAndDelete({_id: id}).exec()
        res.status(200).send(`Successfully deleted contract ${id}`)
    } catch (err) {
        res.status(500).send('Error')
    }
}