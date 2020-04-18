const mongoose = require('mongoose')
const config = require('../config/config.json')
const populateDb = require('./initialPopulate')
const {isEmpty} = require('../utils/utils')
const dbConfig = config.db

let mongoUri = ''
if (isEmpty(dbConfig.user) && isEmpty(dbConfig.password)) {
    mongoUri = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.databaseName}`
} else {
    mongoUri = `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.databaseName}`
}

mongoose
    .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {
        console.log(`Successfully connected to database`)
        populateDb()
    })
    .catch(e => {
        console.log('Could not connect to the database. Exiting now...', e);
        process.exit();
    })

const db = mongoose.connection

module.exports = db
