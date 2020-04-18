const mongoose = require('mongoose')
const Schema = mongoose.Schema

const University = new Schema(
    {
        name: { type: String, required: true },
        sign: { type: String, required: true, unique: true },
        city: { type: String, required: true },
        nation: { type: String, required: true},
        address: { type: String, required: true},
        postCode: { type: String, required: true}
    }
)

module.exports = mongoose.model('university', University)
