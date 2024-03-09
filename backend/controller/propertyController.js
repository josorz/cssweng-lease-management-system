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