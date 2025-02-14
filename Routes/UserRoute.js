const express = require('express')
const { Register, Login, resetPassword, sendResetOTP, checkSubscription } = require('../Controllers/UserCtrl')
const verifyToken = require('../middlewares/auth')
const router = express.Router()

router.post('/register', Register)
router.post('/login', Login)
router.get('/checksubscription', checkSubscription)
router.post('/forgot-password', sendResetOTP)
router.post('/reset-password', resetPassword)

module.exports = router