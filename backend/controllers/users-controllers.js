const User = require('../models/user')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');


const signup = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = res.status(422).json({ error: 'Signing up failed, Plz try again later..' })
        return next(error)
    }

    const { name, email, password, address, phone_no, } = req.body

    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = res.status(500).json({ error: 'Signing up failed, Plz try again later..' })
        return next(error)
    }

    if (existingUser) {
        const error = res.status(422).json({ error: 'User already exists, Login instead' })
        return next(error)
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 14)
    } catch (err) {
        const error = res.status(500).json({ error: 'Could not create User,Please Try again later' })
        return next(error)
    }


    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        address,
        phone_no,
        cart: [],
        orders: []
    })

    try {
        await createdUser.save()
    } catch (err) {
        const error = res.status(500).json({ error: 'Signing up failed, Please try again' })
        return next(error)
    }

    let token;
    try {
        token = jwt.sign({ userId: createdUser.id, email: createdUser.email },
            'ecommerce-website',
            { expiresIn: '2 days' }
        )
    } catch (err) {
        const error = res.status(500).json({ error: 'Signing up failed, Please try again' })
        return next(error)
    }

    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token })

}

const login = async (req, res, next) => {

    const { email, password } = req.body

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = res.status(500).json({ error: 'Logging In failed, Plz try again later..' })
        return next(error)
    }

    if (!existingUser) {
        const error = res.status(403).json({ error: 'Invalid Credentials, Could not Log you in' })
        return next(error)
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    } catch (err) {
        const error = res.status(500).json({ error: 'Could not Log you in , Check Credentials and try again later' })
        return next(error)
    }

    if (!isValidPassword) {
        const error = res.status(401).json({ error: 'Invalid Credentials, Could not Log you in' })
        return next(error)
    }

    let token;
    try {
        token = jwt.sign({ userId: existingUser.id, email: existingUser.email },
            'ecommerce-website',
            { expiresIn: '2 days' }
        )
    } catch (err) {
        const error = res.status(500).json({ error: 'LoggingIn failed, Please try again' })
        return next(error)
    }

    res.json({ userId: existingUser.id, email: existingUser.email, token: token })
}

exports.signup = signup
exports.login = login
 
