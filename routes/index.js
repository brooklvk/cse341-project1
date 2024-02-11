const router = require('express').Router();

const myController = require('../controllers');

router.get('/cows', myController.getAll);
router.get('/cows/:id', myController.getOne);

router.post('/cows', myController.createNew);
router.put('/cows/:id', myController.updateCow);
router.delete('/cows/:id', myController.deleteCow);

module.exports = router;