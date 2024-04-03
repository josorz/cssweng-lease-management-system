const MaintenanceTasks = require('../models/MaintenanceTasks')
const Properties = require('../models/Properties')

exports.getMaintenanceTasks = async (req, res) => {
    try {
        const propertyId = req.params.propertyId
        let response
        if (!propertyId) {
            response = await MaintenanceTasks.find({}).populate('property')
        } else {
            const property = await Properties.findOne({_id: propertyId}, 'loc_number loc_street').exec()
            const tasks = await MaintenanceTasks.findOne({property: propertyId}).exec()
            response = {property, tasks: [tasks]}
        }
        res.status(200).json(response)
    } catch (err) {
        console.error(err)
        res.status(500).send(err.message)
    }
}

exports.getMaintenanceTask = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            res.status(404).send('Task does not exist')
        }

        const task = await MaintenanceTasks.findOne({_id: id})
            .exec()

        res.status(200).json(task)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.createMaintenanceTask = async (req, res) => {
    try { 
        const { property, date, deadline, description, contractor, priority } = req.body;

        const PropertyDetails = await Properties.findOne({_id: property}, 'loc_number loc_street')

        if (!PropertyDetails) {
            res.status(500).send('Property does not exist!');
        }

        // TODO: Check Logic for date

        // If deadline is later than date then return an error, if not

        const newMaintenanceTask = await MaintenanceTasks.create({
            property,
            date,
            deadline,
            description,
            contractor,
            priority
        })

        const response = {
            _id: newMaintenanceTask._id,
            property: {
                _id: PropertyDetails._id,
                loc_number: PropertyDetails.loc_number,
                loc_street: PropertyDetails.loc_street
            }
        }

        res.status(200).send(response)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.editMaintenanceTask = async (req, res) => {
    // TODO
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
            return res.status(404).send('Task does not exist!')
        }
        
        await MaintenanceTasks.findByIdAndDelete(id).exec()
        res.status(200).send(`Successfully deleted task!`)
    } catch (err) {
        res.status(500).send('Error')
    }
}

exports.getUpcomingTasks = async (req, res) => {
    try {
        const currentDate = new Date();

        // Query upcoming bills
        const upcomingBills = await MaintenanceTasks.find({
            status: 'Pending',
            deadline: { $gte: currentDate }
        }).populate('property')
        .sort({date_due: 1})
        .exec();

        // Send the upcoming bills as JSON response
        res.status(200).json(upcomingBills);
    } catch (err) {
        res.status(500).send('Error')
    }
}