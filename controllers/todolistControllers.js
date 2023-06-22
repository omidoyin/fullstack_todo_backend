//connect to database here
const Todos = require("../model/todolistDB");
const cloudinary = require("../config/cloudinary")


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
  if(!req?.body?.userid)return res.status(400).json('unknown user')
  const { taskname, task } = req.body;
 
  if (!taskname || !task) {
    return res.json("taskname and task are required");
  }
  try {
    let picResult ;
 if (req?.file){

   const b64 = Buffer.from(req?.file?.buffer).toString("base64");
   let dataURI = "data:" + req?.file?.mimetype + ";base64," + b64;

    picResult = await cloudinary.uploader.upload(dataURI)
  //  console.log(picResult)
 }

    const result = await Todos.create({
      taskname,
      task,
      userid: req?.body?.userid,
      imageUrl: picResult?.secure_url,
      imageCloud_id: picResult?.public_id 
    });
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
    console.log(req?.body?.iscompleted)
    console.log(typeof req?.body?.iscompleted === "boolean")
    if (typeof req?.body?.iscompleted !== "undefined") {
      console.log('here boolean')
      selectedTodo.iscompleted =  req?.body?.iscompleted ;
    }
    if (req?.file) {
      // first delete the current image
      if (selectedTodo.imageCloud_id){

        await cloudinary.uploader.destroy(selectedTodo.imageCloud_id);
      }

      // then reupload a new image on the same todolist
      const b64 = Buffer.from(req?.file?.buffer).toString("base64");
      let dataURI = "data:" + req?.file?.mimetype + ";base64," + b64;
  
      const picResult = await cloudinary.uploader.upload(dataURI)

      selectedTodo.imageUrl= picResult.secure_url,
      selectedTodo.imageCloud_id = picResult.public_id 
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

    await cloudinary.uploader.destroy(selectedTodo.imageCloud_id)
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
