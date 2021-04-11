const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]   // received as- Authorization: 'Bearer TOKEN'
        if (!token) {
            throw new Error(' 1 Authentication  Failed!')
        }
        const decodedToken = jwt.verify(token, 'ecommerce-website')
        req.userData = { userId: decodedToken.userId }
        next()
    } catch (err) {
        const error = res.status(403).json({error:'2 Authentication Failed'}) 
        return next(error)
    }
}