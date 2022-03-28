const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', { title: 'My title', message: 'My message' })
})

module.exports = router