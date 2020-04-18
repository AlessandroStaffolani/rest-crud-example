const express = require('express');
const router = express.Router();
const { getRoutesFromRouters, apiToStringArray } = require('../../utils/utils');
const studentApi = require('./student');
const universityApi = require('./university');
const ResponseObject = require('../../utils/ResponseObject');

/* GET home page. */
router.get('/', function(req, res, next) {
    const sortByPath = req.query.sortByPath || false;
    const groupByMethod = req.query.groupByMethod || false;
    console.log(sortByPath, groupByMethod)
    const api = getRoutesFromRouters([
        {router: universityApi, prefix: 'api/v1/universities'},
        {router: studentApi, prefix: 'api/v1/students'}
    ], sortByPath, groupByMethod)
    res.status(200)
    res.json(ResponseObject(200, 'Server is running', {
        api: apiToStringArray(api)
    }))
});

module.exports = router;
