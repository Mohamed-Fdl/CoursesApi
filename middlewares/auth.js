const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token')

    if (!token) return res.status(401).send('Not authorized')

    try {
        const decoded = jwt.verify(token, process.env.app_jwtPrivateKey)
        req.user = decoded
        next()
    } catch (ex) {
        res.status(400).send('Invalid Token')
    }
}

module.exports = auth