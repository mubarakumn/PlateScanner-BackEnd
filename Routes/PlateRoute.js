const express = require('express')
const {AddPlate, Plates, GetPlate, UpdateStatus, UpdateComments} = require('../Controllers/PlateCtrl')
const router = express.Router()

router.post('/add', AddPlate)
router.get('/', Plates)
router.get('/:number', GetPlate)
router.put('/:plateNumber/update-status', UpdateStatus)
router.put('/:plateNumber/update-comments', UpdateComments)

module.exports = router