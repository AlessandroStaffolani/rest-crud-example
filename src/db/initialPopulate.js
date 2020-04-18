const universityDao = require('../models/dao/UniversityDAO');

function populateUniversity() {
    const promises = []
    promises.push(universityDao.add({
        name: "University of Bologna",
        sign: "UNIBO",
        city: "Bologna",
        nation: "italy",
        address: "Via Zamboni, 33",
        postCode: "40126"
    }))
    promises.push(universityDao.add({
        name: "University of Ancona",
        sign: "UNIVPM",
        city: "Ancona",
        nation: "italy",
        address: "Piazza Roma, 22",
        postCode: "60121"
    }))
    promises.push(universityDao.add({
        name: "University College London",
        sign: "UCL",
        city: "London",
        nation: "united kingdom",
        address: "Gower Street",
        postCode: "WC1E 6BT"
    }))
    return Promise.all(promises)
}

function populateDb() {
    universityDao.getAll()
        .then(universities => {
            if (universities.length === 0) {
                populateUniversity()
                    .then(() => console.log('DB Populated'))
                    .catch(err => console.log(err))
            }
        })
}

module.exports = populateDb;
