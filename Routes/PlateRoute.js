const express = require('express')
const {AddPlate, Plates, GetPlate, UpdateStatus, UpdateComments} = require('../Controllers/PlateCtrl')
const router = express.Router()

router.post('/add', AddPlate)
router.get('/', Plates)
router.get('/:number', GetPlate)
router.post('/:plateNumber/:status', UpdateStatus)
router.post('/comments/:plateNumber', UpdateComments)

module.exports = router