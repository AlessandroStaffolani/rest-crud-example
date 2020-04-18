const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

/* GET home page. */
router.get('/', studentController.getAll);
router.get('/id/:id', studentController.getById);
router.get('/code/:code', studentController.getByCode);
router.post('/', studentController.add);
router.put('/id/:id', studentController.update);
router.delete('/', studentController.removeAll);
router.delete('/id/:id', studentController.remove);

module.exports = router;
