const express=require("express");
const UserModel=require("../models/user.model")
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv")
dotenv.config()

exports.register=async(req,res)=>{
    
    let {name,email,password,balance}=req.body;
    try {
        if(!name||!email||!password){
          return  res.status(400).json({message:"Provide complete info"});

        }
   
let hashedPassword=await bcrypt.hash(password,5)
        let user=new UserModel({
       name,
       email,
       password:hashedPassword,
       balance
        });
   
        await user.save();
        res.status(201).json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}


exports.login=async(req,res)=>{
    let {email,password}=req.body;
try {
    let user=await UserModel.findOne({email});
    let check=bcrypt.compare(password,user.password);
if(check){
    let accessToken=jwt.sign({name:user.name,userID:user._id,email},process.env.JWT_SECRET_KEY,{algorithm:'HS256'});
    res.status(200).json({message:"Login Successful",accessToken})
}
} catch (error) {
    
}
}