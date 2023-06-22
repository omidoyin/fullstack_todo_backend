const Todos = require("../model/todolistDB");
const cloudinary = require("../config/cloudinary");

const postImage = async (req, res) => {
  // if(!req.body.userid)return res.status(400).json('unknown user')
  // const { taskname, task } = req.files;
  // const { taskname, task } = req.body;
  // console.log(req)
  console.log(req?.body);
  console.log(req?.file);
  // console.log("request userid",req?.body?.userid)
  // console.log("request task",task)
  // if (!taskname || !task) {
  //   return res.json("taskname and task are required");
  // }
  // try {
  // const picResult = await cloudinary.uploader.upload(req.file)
  //   const result = await Todos.create({
  //     taskname,
  //     task,
  // userid: req?.files?.userid,
  //         userid: req?.body?.userid,
  //       });

  //       res.status(200).json(result);
  //     } catch (err) {
  //       console.error(err);
  //     }
};

module.exports = {
  postImage,
};
