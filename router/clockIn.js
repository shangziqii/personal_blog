//打卡
const express = require('express')
const router = express.Router()

const { clockInFunc } = require('./../router_function/clockIn_function')
router.post('/clockIn', clockInFunc);
module.exports = router;