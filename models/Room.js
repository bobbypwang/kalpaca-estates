const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    name: String,
    type: String
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room