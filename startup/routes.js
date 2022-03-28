const express = require('express')

const courses = require('../routes/courses')

const authors = require('../routes/authors')

const users = require('../routes/users')

const auth = require('../routes/auth')

const home = require('../routes/home')

const error = require('../middlewares/error')

module.exports = function(app) {
    // ROUTES
    app.use(express.json())

    app.use(express.urlencoded({ extended: true }))

    app.use(express.static('public'))

    app.set('view engine', 'pug')

    app.set('views', './views')

    app.use('/api/courses', courses)

    app.use('/api/authors', authors)

    app.use('/api/users', users)

    app.use('/api/auth', auth)

    app.use('/', home)

    //EXPRESS MIDDLEWARE ERRORS ALWAYS AFTER ALL MIDDLEWARES
    app.use(error)
}