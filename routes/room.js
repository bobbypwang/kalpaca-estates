const express = require('express')
const router = express.Router()
const Room = require('../models/Room.js')
const Amenity = require('../models/Amenity.js')

router.get('/rooms', (req, res, next) => {
    Room.find({}).populate("amenity")
        .then((allRooms) => {
            if (!req.user) {
                req.flash('errorGlobal', 'Please login to view rooms')
                req.redirect('/')
            } else {
                res.render('../views/rooms/index', {
                    rooms: allRooms
                })
            }
        }).catch((err) => {
            next(err)
        })
})

router.get('/rooms/details/:theId', (req, res, next) => {
    let id = req.params.theId

    Room.findById(id)
        .then((theRoom) => {
            res.render('../views/rooms/show', {
                theRoom
            })
        }).catch((err) => {
            next(err)
        })
})

router.get('/rooms/new', (req, res, next) => {
    Amenity.find({})
        .then((amenity) => {
            res.render('../views/rooms/new', {
                amenity
            })
        })
        .catch((err) => {
            next(err)
        })
})

router.post('/rooms', (req, res, next) => {
    Room.create(req.body)

        .then((result) =>
            res.redirect('/rooms')
        )

        .catch((error) => {
            res.render('../views/rooms/new', {
                error
            })
        })
})

router.post('/rooms/:theId/delete', (req, res, next) => {
    let id = req.params.theId

    Room.findByIdAndRemove(id)
        .then((result) => {
            res.redirect('/rooms')
        })
        .catch((err) => {
            next(err)
        })
})

router.get('/rooms/:theId/edit', (req, res, next) => {
    let id = req.params.theId
    Room.findById(id).populate("amenity")
        .then((data) => {
            Amenity.find({})
                .then((amenity) => {
                    amenity.forEach((eachCeleb) => {
                        if (eachAmenity._id.equals(data.amenity._id)) {
                            // we're not allowed to use === to compare IDs
                            // just because mongoose wont let you
                            // but instead they have their own method called .equals

                            eachAmenity.isTheChosenOne = true;
                        }
                    })
                    res.render('../views/rooms/edit', {
                        data,
                        amenity
                    })
                })
        }).catch((err) => {
            next(err)
        })
})

router.post('/rooms/:theId', (req, res, next) => {
    Room.findByIdAndUpdate(req.params.theId, req.body)
        .then((result) => {
            res.redirect('/rooms')
        })
        .catch((err) => {
            next(err)
        })
})

router.post('/booking', (req, res, next) => {
    let checkInDate = req.body.checkInDate;
    let checkOutDate = req.body.checkOutDate;
    console.log(req.query.start + ' + ' + req.query.end)
    res.redirect('/booking?start:'+checkInDate+'&end:'+checkOutDate)
})

router.get('/booking', (req, res, next) => {
    let checkInDate = req.query.start;
    let checkOutDate = req.query.end;

    // booking logic goes here for the rooms.

    res.render('../views/booking')
})

module.exports = router;