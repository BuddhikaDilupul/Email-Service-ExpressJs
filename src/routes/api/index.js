const express = require('express')
const router = express.Router()

const email = require('./email.route')
router.use('/', email)

module.exports = router
