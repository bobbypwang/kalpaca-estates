const express = require('express')
const router = express.Router()
const Amenity = require('../models/Amenity.js')


router.get('/amenities', async (req, res, next) => {
    try {
        let celebs = await Amenity.find({})
        res.render('../views/amenities/index', {
            celebs
        })
    } catch (err) {
        next(err)
    }
})

router.get('/amenities/details/:theId', (req, res, next) => {
    let id = req.params.theId

    Amenity.findById(id)
        .then((theCelebrity) => {
            res.render('../views/amenities/show', {
                aCeleb: theCelebrity
            })
        }).catch((err) => {
            next(err)
        })
})

router.get('/amenities/new', (req, res, next) => {
    res.render('../views/amenities/new')
})

router.post('/amenities', (req, res, next) => {
    let name = req.body.theName
    let occupation = req.body.theOccupation
    let catchPhrase = req.body.theCatchPhrase

    Amenity.create({
            name: name,
            occupation: occupation,
            catchPhrase: catchPhrase
        })

        .then((result) =>
            res.redirect('/amenities')
        )

        .catch((error) => {
            res.render('../views/amenities/new', {
                error
            })
        })
})

router.post('/amenities/:theId/delete', (req, res, next) => {
    let id = req.params.theId

    Amenity.findByIdAndRemove(id)
        .then((result) => {
            res.redirect('/amenities')
        })
        .catch((err) => {
            next(err)
        })
})

router.get('/amenities/:theId/edit', (req, res, next) => {
    let id = req.params.theId
    Amenity.findById(id)
        .then((theCeleb) => {
            res.render('../views/amenities/edit', {
                celeb: theCeleb
            })
        }).catch((err) => {
            next(err)
        })
})

router.post('/amenities/:theId', (req, res, next) => {
    let id = req.params.theId
    let name = req.body.theName
    let occupation = req.body.theOccupation
    let catchPhrase = req.body.theCatchPhrase

    Amenity.findByIdAndUpdate(id, {
            name: name,
            occupation: occupation,
            catchPhrase: catchPhrase
        })
        .then((result) => {
            res.redirect('/amenities')
        })
        .catch((err) => {
            next(err)
        })
})

module.exports = router;