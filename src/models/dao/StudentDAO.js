const StudentModel = require('../Student');

function getAll(options={populate: false}) {
    let students = StudentModel.find()
    if (options.populate) {
        students.populate({
            path: 'university'
        })
    }
    return students
}

function getById(id, options={populate: false}) {
    const student = StudentModel.findById(id)
    if (options.populate) {
        student.populate({
            path: 'university'
        })
    }
    return student;
}

function getByCode(code, options={populate: false}) {
    const student = StudentModel.findOne({ code })
    if (options.populate) {
        student.populate({
            path: 'university'
        })
    }
    return student;
}

function add(data) {
    return new StudentModel(data).save()
}

function update(id, data) {
    return StudentModel.findOneAndUpdate({_id: id}, data, {new: true})
}

function remove(id) {
    return StudentModel.findByIdAndRemove(id)
}

function removeAll() {
    return StudentModel.deleteMany({})
}

module.exports = {
    getAll,
    getById,
    getByCode,
    add,
    update,
    remove,
    removeAll
}
