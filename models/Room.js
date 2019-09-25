const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    name: String,
    type: String,
    price: Number,
    bedType: String,
    bedNumber: Number,
    floorLocation: String,
    amenity: {type: Schema.Types.ObjectId, ref: "Amenity"},
    bookeDates: Date
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room