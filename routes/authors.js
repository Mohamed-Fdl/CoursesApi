//REQUIREMENTS
const mongoose = require('mongoose');

const express = require('express')

const Joi = require('joi')

const router = express.Router()

const { Author, validater } = require("../models/author")

//MIDDLEWARES
const auth = require('../middlewares/auth')

const admin = require('../middlewares/admin')

const validateObjectId = require('../middlewares/validateObjectId')


//ROUTER



router.get('/:id', validateObjectId, async(req, res) => {

    const author = await Author.findById(req.params.id)

    if (!author) return res.status(404).send('404 ERROR : The author is not available')

    res.send(author)
})

router.post('/', async(req, res) => {
    const validate = validater(req.body)

    let bio = req.body.bio === undefined ? req.body.bio : ''

    if (validate.error) return res.status(400).send(validate.error.details[0].message)

    let author = new Author({
        name: req.body.name,
        email: req.body.email,
        bio: bio,
        website: req.body.website,
    })

    author = await author.save()

    res.send(author)
})



module.exports = router