const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
const { hash } = require("bcryptjs");
dotenv.config()

async function adminMiddleware(req,res,next){
try {
    let token=req.headers.authorization.split(" ")[1];
   jwt.verify(token,process.env.JWT_SECRET_KEY,function(err,decode){
    if(err){
        res.status(400).json({err})
    }
    if(decode){
        if(decode)
        if(decode.role==='admin'){
          next()  
        }
        else{
            res.status(400).json({message:"You are not allowed to access this route"})
        }
        
    }
   })
   
} catch (error) {
    res.status(500).json({error})
}
}

module.exports=adminMiddleware