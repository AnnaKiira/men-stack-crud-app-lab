const mongoose = require('mongoose')

const crystalSchema = new mongoose.Schema({
    name: String,
    description: String
})

const Crystal = mongoose.model('Crystal', crystalSchema)

module.exports = Crystal;