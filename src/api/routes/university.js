const express = require('express');
const router = express.Router();
const universityController = require('../controllers/universityController');

/* GET home page. */
router.get('/', universityController.getAll);
router.get('/id/:id', universityController.getById);
router.get('/sign/:sign', universityController.getBySign);
router.post('/', universityController.add);
router.put('/id/:id', universityController.update);
router.delete('/', universityController.removeAll);
router.delete('/id/:id', universityController.remove);

module.exports = router;
