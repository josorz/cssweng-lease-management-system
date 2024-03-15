const Properties = require('../models/Properties')

// GET request for list of all posts.
exports.getProperties = async (request, response) => {
    try {
        const properties = await Properties.find().exec()
        response.status(200).json(properties);
    } catch (err) {
        response.status(500).send('Error')
    }
}

exports.getProperty = async (request, response) => {
    try {
        const id = request.params.id
        if (!id) {
            response.status(404).send('Property does not exist')
        }
        const properties = await Properties.findOne({_id: id}).exec()
        response.status(200).json(properties)
    } catch (err) {
        response.status(500).send('Error')
    }
}

exports.deleteProperty = async (request, response) => {
    try {
        const { id } = request.body
        if (!id) {
            response.status(404).send('Property does not exist')
        }
        await Properties.findByIdAndDelete({_id: id}).exec()
        response.status(200).send(`Successfully deleted property ${id}`)
    } catch (err) {
        response.status(500).send('Error')
    }
}