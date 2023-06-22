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
    imageUrl:{
        type:String,
    },
    imageCloud_id :{
        type:String,
    },
    userid:mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('Todos',todoListSchema)