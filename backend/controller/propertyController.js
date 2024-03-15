const Properties = require('../models/Properties')

// GET req for list of all posts.
exports.getProperties = async (req, res) => {
    try {
        const properties = await Properties.find().exec()
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).send('Error')
    }
}

exports.createProperty = async (req, res) => {
    try {
        const { property_type, loc_number, loc_street, 
            loc_propertyname, loc_barangay, loc_city } = req.body;

        await Properties.create({
            property_type,
            loc_number,
            loc_street,
            loc_propertyname,
            loc_barangay,
            loc_city
        })

        res.status(200).send(`Property added!`)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.editProperty = async (req, res) => {
    try {
        const { property_type, loc_number, loc_street, 
            loc_propertyname, loc_barangay, loc_city } = req.body;

        await Properties.updateOne({
            _id: req.params.id
        }, {
            property_type,
            loc_number,
            loc_street,
            loc_propertyname,
            loc_barangay,
            loc_city
        })

        res.status(200).send(`[${req.params.id}] property edited!`)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.getProperty = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            res.status(404).send('Property does not exist')
        }
        const properties = await Properties.findOne({_id: id}).exec()
        res.status(200).json(properties)
    } catch (err) {
        res.status(500).send('Error')
    }
}

exports.deleteProperty = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            res.status(404).send('Property does not exist')
        }
        await Properties.findByIdAndDelete({_id: id}).exec()
        res.status(200).send(`Successfully deleted property ${id}`)
    } catch (err) {
        res.status(500).send('Error')
    }
}