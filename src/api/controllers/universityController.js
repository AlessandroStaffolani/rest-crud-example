const ResponseObject = require('../../utils/ResponseObject');
const UniversityDao = require('../../models/dao/UniversityDAO');

function getAll(req, res, next) {
    UniversityDao.getAll()
        .then(universities => res.status(200).json(new ResponseObject(200, 'All universities', {universities})))
        .catch(err => next(err))
}

function getById(req, res, next) {
    UniversityDao.getById(req.params.id)
        .then(university => {
            if (university) {
                res.status(200).json(new ResponseObject(200, 'University object', university))
            } else {
                res.status(404).json(new ResponseObject(404, 'University not found', null))
            }
        })
        .catch(err => next(err))
}

function getBySign(req, res, next) {
    UniversityDao.getBySign(req.params.sign.toUpperCase())
        .then(university => {
            if (university) {
                res.status(200).json(new ResponseObject(200, 'University object', university))
            } else {
                res.status(404).json(new ResponseObject(404, 'University not found', null))
            }
        })
        .catch(err => next(err))
}

function add(req, res, next) {
    UniversityDao.add(req.body)
        .then(university => res.status(201).json(new ResponseObject(201, 'Added new university', university)))
        .catch(err => {
            if (err.name === 'ValidationError') {
                res.status(400).json(new ResponseObject(401, 'Invalid request', {error: err.message}))
            } else {
                next(err)
            }
        })
}

function update(req, res, next) {
    UniversityDao.update(req.params.id, req.body)
        .then(university => {
            if (university) {
                res.status(200).json(new ResponseObject(200, 'University updated', university))
            } else {
                res.status(404).json(new ResponseObject(404, 'University not found', null))
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
    UniversityDao.remove(req.params.id)
        .then(university => {
            if (university) {
                res.status(200).json(new ResponseObject(200, 'University removed', university))
            } else {
                res.status(404).json(new ResponseObject(404, 'University not found', null))
            }
        })
        .catch(err => next(err))
}

function removeAll(req, res, next) {
    UniversityDao.removeAll()
        .then(universities => res.status(200).json(new ResponseObject(200, 'All universities have been removed', {universities})))
        .catch(err => next(err))
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
