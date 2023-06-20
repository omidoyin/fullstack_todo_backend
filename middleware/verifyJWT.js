const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req,res, next)=>{
    if(!req?.headers)return res.status(400).json('invalid headers')
const authHeaders = req?.headers?.authorization || req?.headers?.Authorization;
if(!authHeaders?.startsWith('Bearer ')) return res.status(403).json('unauthorized attempts')
const token = authHeaders.split(' ')[1]
// console.log('token is',token)

     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err){
            // if (err instanceof TokenExpiredError) {
            //     return res.status(401).send({ success: false, message: 'Unauthorized! Access Token was expired!' });
            //   }
            //   if (err instanceof NotBeforeError) {
            //     return res.status(401).send({ success: false, message: 'jwt not active' });
            //   }
            //   if (err instanceof JsonWebTokenError) {
            //     return res.status(401).send({ success: false, message: 'jwt malformed' });
            //   }
            // console.log(err)
            return  res.status(403).json(err)
            //   return err.message
        } 

        // req.body.email = decoded.email;
        req.body.email = decoded.email;
        // req.body.userid = decoded?.UserInfo?.userid;
        next();

        })
    
}

module.exports= verifyJWT;