const express = require('express');
const router = express.Router();
const {postImage} = require('../controllers/imageController')
const upload = require("../config/multer")



router.route('/')
    .post(upload.single('image'),postImage)



    module.exports = router;