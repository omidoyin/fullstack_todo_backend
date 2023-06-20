//connect to database here
const Todos = require("../model/todolistDB");

// store the userid with each task posted to check for each user's post to post and to get and update individual todolist.

const getTodoList = async (req, res) => {
  if(!req?.params?.id){return res.status(400).json('unknown user');}
  const todos = await Todos.find({ userid: req?.params?.id });
  // userid:parseFloat(req.params.userid)
  // if(!todos) return res.status(204).json('no todos')
  return res.json(todos);
};
const getATodo = async (req, res) => {
  try {
    if (!req?.params?.id) {
      return res.status(400).json("unknown user");
    }
    const todo = await Todos.find({ _id: req?.params?.id });

    if (!todo) return res.status(204).json("no todo");
    return res.json(todo);
  } catch (err) {
    return res.json(`${err}`);
  }
};
const postTodoList = async (req, res) => {
  // if(!req.body.userid)return res.status(400).json('unknown user')
  const { taskname, task } = req.body;
  // console.log("request userid",req?.body?.userid)
  // console.log("request task",task)
  if (!taskname || !task) {
    return res.json("taskname and task are required");
  }
  try {
    const result = await Todos.create({
      taskname,
      task,
      userid: req?.body?.userid,
    });
    // res.json('task added successfully');
    // res.sendStatus(200);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateTodoList = async (req, res) => {
  // console.log(req.params);
  try {
    if (!req?.params?.id) {
      return res.status(400).json("id is required");
    }

    const selectedTodo = await Todos.findOne({ _id: req?.params?.id }).exec();
    if (!selectedTodo) {
      return res.status(500).json("incorrect id ");
    }
    //update the words and also complete and uncompleted tasks.
    if (req?.body?.taskname) {
      selectedTodo.taskname = req.body.taskname;
    }
    if (req?.body?.task) {
      selectedTodo.task = req.body.task;
    }
    if (typeof req?.body?.iscompleted === 'boolean') {
      selectedTodo.iscompleted =  req?.body?.iscompleted ;
      // req?.body?.iscompleted
    }
    const result = await selectedTodo.save();
    res.json(result);
  } catch (err) {
    return res.json(`${err}`);
  }
};
const deleteATodoList = async (req, res) => {
  try {
    if (!req?.params?.id) {
      return res.status(400).json("id is required");
    }

    const selectedTodo = await Todos.findOne({ _id: req.params.id }).exec();
    if (!selectedTodo) {
      return res.status(500).json("incorrect id ");
    }

    const result = await Todos.deleteOne({ _id: req.params.id });
    res.sendStatus(204);
  } catch (err) {
    return res.json(`${err.message}`);
  }
};
//DO IT LATER
// const deleteAllTodoList = async (req,res)=>{
//     try{

//     }catch(err){
//            console.error(err)
//     }
// }

module.exports = {
  getTodoList,
  postTodoList,
  updateTodoList,
  deleteATodoList,
  getATodo,
};
