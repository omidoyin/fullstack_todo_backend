const Users = require('../model/usersDB')
const bcrypt = require('bcrypt')

const getUsers = async(req,res)=>{
    
        const foundUser = await Users.find();
        if(!foundUser) { return res.status(204).json('no user in database');}
        res.json(foundUser);
}
const createUsers = async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json("email and password are required")
    try{
        const foundUser = await Users.findOne({email:email}).exec();
        if(foundUser) return res.status(409).json(`user ${email} already exist in database`)
        const hashedPwd = await bcrypt.hash(password,10);
        // console.log(hashedPwd)
        await Users.create({email, password:hashedPwd})
        res.status(200).json('user added succcessfully')

    }catch(err){
        // console.error(err)
    }
}
const updateUserdetails = async(req,res)=>{
    try{

    }catch(err){
        console.error(err)
    }
}
const deleteUser = async(req,res)=>{
    if(!req?.body?.id) return res.status(400).json('id is required')
        const foundUser = await Users.findOne({_id:req.body.id}).exec();
        if(!foundUser) return res.status(409).json(`user not in database`)
        await Users.deleteOne({_id:req.body.id})
        res.status(200).json("user deleted")
    
}


module.exports = {getUsers,createUsers, updateUserdetails, deleteUser};