const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Number, required: true },
    image: [{ type: String, required: true  }],
    review: [{
        name: { type: String, required: true },
        comment: { type: String, required: true }
    }]

})

productSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Product', productSchema)