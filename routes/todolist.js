const express = require('express');
const router = express.Router();
const {getTodoList,postTodoList, updateTodoList, deleteATodoList,getATodo} = require('../controllers/todolistControllers')



router.route('/')
    .post(postTodoList)
    
router.route('/:id')
    .get(getTodoList)
    .put(updateTodoList)
    .delete(deleteATodoList);
router.route('/todo/:id')
    .get(getATodo)

module.exports = router;