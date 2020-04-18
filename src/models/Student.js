const mongoose = require('mongoose');
const UniversityModel = require('./University');
const Schema = mongoose.Schema

const Student = new Schema(
    {
        name: { type: String, required: true },
        last_name: { type: String, required: true },
        code: { type: String, required: true, unique: true},
        phone: {
            country: { type: String },
            number: { type: String }
        },
        average: { type: Number, default: 0},
        university: {
            type: Schema.Types.ObjectId,
            ref: 'university',
            required: true
        }
    }
)

const StudentModel = mongoose.model('student', Student);

//Export model
module.exports = StudentModel;
