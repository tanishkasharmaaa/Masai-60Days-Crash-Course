const express=require("express");
const userModel = require("../models/user.model");
const adminCount = require("../middleware/adminCount");
const userRouter=express.Router();
const bcrypt=require("bcrypt");
const dotenv=require("dotenv");
const jwt=require("jsonwebtoken")

userRouter.use(express.json());

userRouter.post('/register',adminCount,async(req,res)=>{
    let {name,password,email,role}=req.body

try {
    let user;
  bcrypt.hash(password, 5,async function(err, hash) {
      if(err){
        res.status(400).send(err)
      }
      if(hash){
      user=new userModel({
        name,
        email,
        password:hash,
        role
      })
      await user.save();

      }
      res.status(201).send(user) 
   
    });
} catch (error) {
    console.log(error)
}
})

userRouter.post('/login', async(req,res)=>{
  const {email,password}=req.body;
    try {
      let user=await userModel.findOne({email})
 bcrypt.compare(password, user.password,function(err, result) {
     if(err){
      res.status(400).send(err)
     }
     if(result){
      let accessToken=jwt.sign({email:email,role:user.role,userID:user._id },process.env.JWT_SECRET_KEY, { algorithm: 'HS256' });
      res.status(200).json({message:"Login Successful",accessToken:accessToken})
     }
  });
   
    } catch (error) {
      console.log(error)
    }
})

module.exports=userRouter