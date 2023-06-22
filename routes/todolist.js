const express = require('express');
const router = express.Router();
const {getTodoList,postTodoList, updateTodoList, deleteATodoList,getATodo} = require('../controllers/todolistControllers')
const upload = require("../config/multer")



router.route('/')
    .post(upload.single('image'),postTodoList)
    
router.route('/:id')
    .get(getTodoList)
    .put(upload.single('image'), updateTodoList)
    .delete(deleteATodoList);
router.route('/todo/:id')
    .get(getATodo)

module.exports = router;