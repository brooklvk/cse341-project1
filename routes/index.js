const router = require('express').Router();

const myController = require('../controllers');

router.get('/cows', myController.getAllCows);
router.get('/cows/:id', myController.getOneCow);

router.post('/cows', myController.createNewCow);
router.put('/cows/:id', myController.updateCow);
router.delete('/cows/:id', myController.deleteCow);

router.get('/calves', myController.getAllCalves);
router.get('/calves/:id', myController.getOneCalf);

router.post('/calves', myController.createNewCalf);
router.put('/calves/:id', myController.updateCalf);
router.delete('/calves/:id', myController.deleteCalf);

module.exports = router;