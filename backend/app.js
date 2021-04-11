const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const HttpError = require('./models/http-error')


const usersRoutes = require('./routes/users-routes')
const productsRoutes = require('./routes/products-routes')
const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-type, Accept, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'get, post, patch, delete')
    next()
})

app.use(bodyParser.json())

app.use('/api/users', usersRoutes)
app.use('/api/products',productsRoutes)


app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404)
    throw error.message
})


mongoose
    .connect(`mongodb+srv://Aamir:Aamir8692@cluster0.st5bw.mongodb.net/ecommerce?retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then(() => {
        app.listen(5000)
    })
    .catch(err => {
        console.log(err)
    })
