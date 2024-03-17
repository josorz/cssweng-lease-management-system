const MaintenanceTasks = require('../models/MaintenanceTasks')
const Properties = require('../models/Properties')

exports.getMaintenanceTasks = async (req, res) => {
    try {
        const propertyId = req.params.propertyId
        if (!propertyId) {
            res.status(404).send('Property does not exist')
        }

        const property = await Properties.findOne({_id: propertyId}, 'loc_number loc_street').exec()

        const tasks = await MaintenanceTasks.findOne({property: propertyId}).exec()

        const response = {property, tasks: [tasks]}
        res.status(200).json(response)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.getMaintenanceTask = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            res.status(404).send('Task does not exist')
        }

        const task = await MaintenanceTasks.findOne({_id: id}).exec()

        res.status(200).json(task)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.createMaintenanceTask = async (req, res) => {
    try { 
        const { property, date, deadline, description, contractor, priority } = req.body;

        const newMaintenanceTask = await MaintenanceTasks.create({
            property,
            date,
            deadline,
            description,
            contractor,
            priority
        })

        await Properties.findOneAndUpdate(
            { _id: property },
            { $push: { contract_history: newMaintenanceTask._id } }
        ).exec()

        res.status(200).send(`MaintenanceTask added!`)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.editMaintenanceTask = async (req, res) => {
    try {
        const { contract_type, loc_number, loc_street, 
            loc_contractname, loc_barangay, loc_city } = req.body;

        await MaintenanceTasks.updateOne({
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

exports.deleteMaintenanceTask = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            res.status(404).send('Task does not exist!')
        }

        await Properties.findByIdAndUpdate({maintenance_history: {$in: id}},
            { $pull: { maintenance_history: id } }
        ).exec()

        await MaintenanceTasks.findByIdAndDelete({_id: id}).exec()
        res.status(200).send(`Successfully deleted contract ${id}`)
    } catch (err) {
        res.status(500).send('Error')
    }
}