const ResponseObject = require('../../utils/ResponseObject');
const StudentDao = require('../../models/dao/StudentDAO');

function getAll(req, res, next) {
    const options = {
        populate: false
    }
    if (req.query.populate) {
        options.populate = req.query.populate;
    }
    StudentDao.getAll(options)
        .then(students => res.status(200).json(new ResponseObject(200, 'All students', {students})))
        .catch(err => next(err))
}

function getById(req, res, next) {
    const options = {
        populate: false
    }
    if (req.query.populate) {
        options.populate = req.query.populate;
    }
    StudentDao.getById(req.params.id, options)
        .then(student => {
            if (student) {
                res.status(200).json(new ResponseObject(200, 'Student object', student))
            } else {
                res.status(404).json(new ResponseObject(404, 'Student not found', null))
            }
        })
        .catch(err => next(err))
}

function getByCode(req, res, next) {
    const options = {
        populate: false
    }
    if (req.query.populate) {
        options.populate = req.query.populate;
    }
    StudentDao.getByCode(req.params.code, options)
        .then(student => {
            if (student) {
                res.status(200).json(new ResponseObject(200, 'Student object', student))
            } else {
                res.status(404).json(new ResponseObject(404, 'Student not found', null))
            }
        })
        .catch(err => next(err))
}

function add(req, res, next) {
    StudentDao.add(req.body)
        .then(student => res.status(201).json(new ResponseObject(201, 'Added new student', student)))
        .catch(err => {
            if (err.name === 'ValidationError') {
                res.status(400).json(new ResponseObject(401, 'Invalid request', {error: err.message}))
            } else {
                next(err)
            }
        })
}

function update(req, res, next) {
    StudentDao.update(req.params.id, req.body)
        .then(student => {
            if (student) {
                res.status(200).json(new ResponseObject(200, 'Student updated', student))
            } else {
                res.status(404).json(new ResponseObject(404, 'Student not found', null))
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                res.status(400).json(new ResponseObject(401, 'Invalid request', {error: err.message}))
            } else {
                next(err)
            }
        })
}

function remove(req, res, next) {
    StudentDao.remove(req.params.id)
        .then(student => {
            if (student) {
                res.status(200).json(new ResponseObject(200, 'Student removed', student))
            } else {
                res.status(404).json(new ResponseObject(404, 'Student not found', null))
            }
        })
        .catch(err => next(err))
}

function removeAll(req, res, next) {
    StudentDao.removeAll()
        .then(students => res.status(200).json(new ResponseObject(200, 'All students have been removed', {students})))
        .catch(err => next(err))
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
