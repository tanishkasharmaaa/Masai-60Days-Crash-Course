const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
const { hash } = require("bcryptjs");
dotenv.config()

async function userMiddleware(req,res,next){
try {
    let token=req.headers.authorization.split(" ")[1];
   jwt.verify(token,process.env.JWT_SECRET_KEY,function(err,decode){
    if(err){
        res.status(400).json({err})
    }
    if(decode){
       if(decode.role=="user"){
        next() 
       }
             
        
      
    }
   })
   
} catch (error) {
    res.status(500).json({error})
}
}

module.exports=userMiddleware