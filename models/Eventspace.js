const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventspaceSchema = new Schema({
    name: String,
    price: String,
    description: String
})

const Eventspace = mongoose.model('Eventspace', eventspaceSchema)

module.exports = Eventspace