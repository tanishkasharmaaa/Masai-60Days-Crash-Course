const mongoose=require("mongoose");
const express=require("express");
const router=express.Router();
const connection=require("../config/userDB");

const path = require("path");
const morgan=require("morgan");
const fs=require("fs");
const userModel = require("../model/user.model");


var accessLogStream=fs.createWriteStream(path.join(__dirname,'../access.log'),{flags:'a'});
router.use(morgan('combined',{stream:accessLogStream}))
router.use(express.json());



router.get('/user/:id',async(req,res)=>{
    try {
       const data= await userModel.find();
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

module.exports=router