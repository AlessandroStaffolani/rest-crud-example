const mongoose = require('mongoose')
const populateDb = require('./initialPopulate')
const dotenv = require('dotenv');
dotenv.config();

let mongoUri = process.env.MONGO_URI

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
