//define schema
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const todoListSchema = new schema({
    taskname:{
        type:String,
        required:true
    },
    task:{
        type:String,
        required:true
    },
    iscompleted:{
        type:Boolean,
        default:false
    },
    userid:mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('Todos',todoListSchema)