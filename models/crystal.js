const mongoose = require('mongoose')

const crystalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        minLength: [5, 'Name should be at least 5 characters.'],
        unique: true
    },
    description: String
})

const Crystal = mongoose.model('Crystal', crystalSchema)

module.exports = Crystal;