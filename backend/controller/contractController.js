const Contracts = require('../models/Contracts')
const Properties = require('../models/Properties')

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
    try {
        // TODO: Update to new contract schema

        // const { property, date_start, date_end, tenant, isTerminated } = req.body;
        // const newContract = await Contracts.create({
        //     property,
        //     date_start,
        //     date_end,
        //     tenant,
        //     isTerminated
        // })

        // TODO: use the computeRentBilling in /utils to compute for the rent
        // then .save() the resulting bills in the Bills schema

        await Properties.findOneAndUpdate(
            { _id: property },
            { $push: { contract_history: newContract._id } }
        ).exec()

        res.status(200).send(`Contract added!`)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.editContract = async (req, res) => {
    try {
        const { contract_type, loc_number, loc_street, 
            loc_contractname, loc_barangay, loc_city } = req.body;

        await Contracts.updateOne({
            _id: req.params.id
        }, {
            contract_type,
            loc_number,
            loc_street,
            loc_contractname,
            loc_barangay,
            loc_city
        })

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
        const contracts = await Contracts.findOne({_id: id}).exec()
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

exports.getContract = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            res.status(404).send('Contract does not exist')
        }
        const contracts = await Contracts.findOne({_id: id}).exec()
        res.status(200).json(contracts)
    } catch (err) {
        res.status(500).send('Error')
    }
}
