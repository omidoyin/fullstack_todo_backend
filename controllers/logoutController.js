const Users = require('../model/usersDB')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const handleLogout = async(req,res)=>{
    // front end to delete access token by setting it null or empty string
    if(!req?.cookies)return res.sendStatus(201)
    const currentcookies = req.cookies;
    const refreshToken = currentcookies.jwt //currentcookies.split(' ')[1]
    // console.log(refreshToken)
    
        const foundUser = await Users.findOne({refreshToken:refreshToken}).exec();
        if(!foundUser){
            res.clearCookie('jwt',{httpOnly:true, sameSite:'none',  secure:true}) // sameSite:'none',  secure:true,
            return res.status(204).json('no cookie but logged out') 
        }else{

            res.clearCookie('jwt',{httpOnly:true, sameSite:'none',  secure:true}) // sameSite:'none',  secure:true,
            foundUser.refreshToken = " "
            await foundUser.save();
            res.sendStatus(204)
        } 
   

}




module.exports = handleLogout;