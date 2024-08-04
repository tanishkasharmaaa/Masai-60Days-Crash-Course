// internal and external moudules and files are importing here
const mongoose=require("mongoose");
const express=require("express");
const router=express.Router();// using express Router middleware
const connection=require("../config/userDB");

const path = require("path");
const morgan=require("morgan");
const fs=require("fs");
const userModel = require("../model/user.model");

// log all requests to access.log
var accessLogStream=fs.createWriteStream(path.join(__dirname,'../access.log'),{flags:'a'});
router.use(morgan('combined',{stream:accessLogStream}))
router.use(express.json());


// making get request here
router.get('/user/:id',async(req,res)=>{
    try {
       const data= await userModel.find();// help to find the data as per the id
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})
//exporting routers from here
module.exports=router