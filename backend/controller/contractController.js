const mongoose = require('mongoose')
const Contracts = require('../models/Contracts')
const Bills = require('../models/Bills')
const Properties = require('../models/Properties')
const { uploadImage } = require('../utils/uploadImage')
const { computeRentBilling } = require('../utils/computeRentBilling')

// GET req for list of all posts.
exports.getContracts = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const today = new Date()
        let contracts;
        
        if (!propertyId) {
            contracts = await Contracts.find({}, 'date_start date_end tenant.last_name isTerminated property')
                .populate('property', 'loc_number loc_street')
                .sort({date_end: -1})
                .exec();
        } else {
            contracts = await Contracts.find({ property: propertyId }, 'date_start date_end isTerminated tenant.last_name')
                .sort({date_end: -1})
                .exec();
            if (contracts.length > 0) {
                // check if there is a current contract
                const latestContract = await Contracts.find({
                    property: propertyId,
                    date_end: { $gte: today },    // date_end greater than today
                    isTerminated: false
                }).sort({date_end: 1})
                if (latestContract && latestContract.length > 0) {
                    contracts = {
                        contracts: [...contracts],
                        currContract: latestContract[0]._id
                    };
                } else {
                    contracts = {
                        contracts: [...contracts],
                        currContract: null
                    };
                }
            }
        }
        
        res.status(200).json(contracts);
    } catch (err) {
        console.error(err)
        res.status(500).send(err.message)
    }
}

exports.getActiveContracts = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const today = new Date()
        
        const contracts = await Contracts.find({ isTerminated: false, date_end: { $gte: today} }, 'date_start date_end tenant.last_name isTerminated property')
            .populate('property', 'loc_number loc_street')
            .sort({date_end: -1})
            .exec();

        
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

        // add image
        const result = await uploadImage(req.file);

        // add contract
        const [entry] = await Contracts.create([{...newContract, tenant: {...newContract.tenant, id_picture: result._id}}], { session: session })        
        const contractId = entry._id

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
        const contracts = await Contracts.findOne({_id: id}).populate('property')
        const bills = await Bills.find({tenant_contract: id}).sort({date_due: 1})
        res.status(200).json({contract: contracts, bills: [...bills]})
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.deleteContract = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            res.status(404).send('Contract does not exist')
        }
        await Contracts.findOneAndUpdate({_id: id}, {isTerminated: true}).exec()
        res.status(200).send(`Successfully deleted contract ${id}`)
    } catch (err) {
        res.status(500).send('Error')
    }
}

exports.getOccupancyChart = async (req, res) => {
    try {
        const currentDate = new Date();
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
        
        const occupiedContracts = await Contracts.find({ isTerminated: false, date_end: { $gt: currentDate }})
                                    .exec()
        const occupied = occupiedContracts.length

        const expiringContracts = await Contracts.find({ 
                                        isTerminated: false,
                                        date_end: {
                                            $gte: twoMonthsAgo,  // Greater than or equal to two months ago
                                            $lt: new Date()      // Less than current date
                                        }
                                    }).exec()
        const expiring = expiringContracts.length

        const properties = await Properties.find({ isHidden: false }).exec()
        const vacant = properties.length - occupied

        const data = [vacant - occupied, occupied, expiring]
        const response = {
                labels: [
                'Vacant',
                'Occupied',
                'Expiring'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: data,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        }
        res.status(200).json(response);
    } catch (err) {
        res.status(500).send('Error')
    }
}

exports.getRentTracker = async (req, res) => {
    try {
        const query = await Contracts.aggregate([
            {
                $lookup: {
                    from: 'Bills', // Collection name of Bills
                    localField: '_id',
                    foreignField: 'tenant_contract',
                    as: 'bills'
                }
            }
        ]);

        const response = await Properties.populate(query, {path: 'property', select: 'loc_number loc_street'})
        res.status(200).json(response)
    } catch(err){
        res.status(500).send(err)
    }
}