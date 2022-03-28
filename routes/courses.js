//REQUIREMENTS
const mongoose = require('mongoose');

const express = require('express')

const Joi = require('joi')

const router = express.Router()

const { Course, validater } = require("../models/course")

//MIDDLEWARES
const auth = require('../middlewares/auth')

const admin = require('../middlewares/admin')

const validateObjectId = require('../middlewares/validateObjectId')


//ROUTER


router.get('/', async(req, res, next) => {
    const courses = await Course.find().sort({ name: 1 })

    res.send(courses)
})

router.get('/:id', validateObjectId, async(req, res) => {

    const course = await Course.findById(req.params.id)

    if (!course) return res.status(404).send('404 ERROR : The course is not available')

    res.send(course)
})

router.post('/', auth, async(req, res) => {
    authors = req.query.authors.split(',')

    const validate = validater(req.body)

    if (validate.error) return res.status(400).send(validate.error.details[0].message)

    let course = new Course({
        name: req.body.name,
        authors: authors
    })

    course = await course.save()

    res.send(course)
})

router.put('/:id', [auth, validateObjectId], async(req, res) => {

    const validate = validater(req.body)

    if (validate.error) return res.status(400).send(validate.error.details[0].message)

    const course = await Course.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

    if (!course) return res.status(404).send('404 ERROR : The course is not available')

    res.send(course)
})

router.delete('/:id', [auth, admin, validateObjectId], async(req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id)

    if (!course) return res.status(404).send('404 ERROR : The course is not available')

    res.send(course)
})



module.exports = router