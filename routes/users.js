//REQUIREMENTS
const mongoose = require('mongoose');

const express = require('express')

const Joi = require('joi')

const router = express.Router()

const { User, validater } = require("../models/user")

const _ = require('lodash')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const auth = require('../middlewares/auth')


//ROUTER

router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select({ _id: 1, name: 1, email: 1 })

    res.send(user)

})

router.post('/', async(req, res) => {
    const validate = validater(req.body)

    if (validate.error) return res.status(400).send(validate.error.details[0].message)

    let user = await User.findOne({ email: req.body.email })

    if (user) return res.status(400).send('User already register')

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(user.password, salt)

    await user.save()

    const token = user.generateAuthToken()


    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
})




module.exports = router