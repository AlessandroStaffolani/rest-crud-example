const UniversityModel = require('../University');

function getAll() {
    return  UniversityModel.find()
}

function getById(id) {
    return  UniversityModel.findById(id)
}

function getBySign(sign) {
    return  UniversityModel.findOne({ sign })
}

function add(data) {
    return new UniversityModel(data).save()
}

function update(id, data) {
    return UniversityModel.findOneAndUpdate({_id: id}, data, {new: true})
}

function remove(id) {
    return UniversityModel.findByIdAndRemove(id)
}

function removeAll() {
    return UniversityModel.deleteMany({})
}

module.exports = {
    getAll,
    getById,
    getBySign,
    add,
    update,
    remove,
    removeAll
}
