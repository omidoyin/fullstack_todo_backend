const express = require('express');
const router = express.Router();
const refreshToken = require('../controllers/refreshController')


router.route('/')
    .get(refreshToken)

module.exports = router;