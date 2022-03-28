//REQUIREMENTS
const mongoose = require('mongoose');

const express = require('express')

const Joi = require('joi')

const router = express.Router()

const { User } = require("../models/user")

const _ = require('lodash')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')


//ROUTER

router.post('/', async(req, res) => {
    const validate = validater(req.body)

    if (validate.error) return res.status(400).send(validate.error.details[0].message)

    let user = await User.findOne({ email: req.body.email })

    if (!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) return res.status(400).send('Invalid email or password')

    const token = user.generateAuthToken()

    res.send(token)
})


//VALIDATING login

function validater(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024)
    })

    return schema.validate(req)
}



module.exports = router