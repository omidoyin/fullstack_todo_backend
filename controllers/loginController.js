const Users = require('../model/usersDB')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const handleLogin= async(req,res)=>{
    const{email, password}=req.body
    if(!email || !password)return res.status(400).json('email and password are required')
        try{
            const foundUser = await Users.findOne({email}).exec();
            if(!foundUser)return res.status(400).json('user not found in database');
            const match = await bcrypt.compare(password,foundUser.password);
            if(match){
                const accessToken = jwt.sign(
                    {
                       
                            'email':email,
                           
                    },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '10m'})

                const refreshToken = jwt.sign({'email':email},process.env.REFRESH_TOKEN_SECRET, {expiresIn:'1d'})

                foundUser.refreshToken = refreshToken;
                await foundUser.save();
                const foundUserId = foundUser._id
                res.cookie('jwt',refreshToken,{httpOnly:true,  secure:true,  sameSite:'none', maxAge:24*60*60*1000}) //sameSite:'none',  secure:true,
                res.status(200).json({"accesstoken":accessToken, "userid":foundUserId})
            }



    }catch(err){
        console.error(err)
    }




}



module.exports = handleLogin;