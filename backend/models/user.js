const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlenth: 6 },
    address: { type: String, required: true },
    phone_no: { type: String, required: true },
    cart: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Product' }],
    orders: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Product' }],

})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)