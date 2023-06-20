const {getUsers,createUsers, updateUserdetails, deleteUser} = require('../controllers/usersController');
const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT')


router.route('/')
    .get(verifyJWT,getUsers)
    .post(createUsers)
    .put(updateUserdetails)
    .delete(deleteUser);


module.exports = router;