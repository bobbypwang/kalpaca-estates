const mongoose = require('mongoose')
const Schema = mongoose.Schema

const amenitySchema = new Schema({
    name: String,
    type: String
})

const Amenity = mongoose.model('Amenity', amenitySchema)

module.exports = Amenity