const express = require('express')
const { Register, Login, forgotPassword, resetPassword, sendResetOTP } = require('../Controllers/UserCtrl')
const router = express.Router()

router.post('/register', Register)
router.post('/login', Login)
router.post('/forgot-password', sendResetOTP)
router.post('/reset-password', resetPassword)

module.exports = router