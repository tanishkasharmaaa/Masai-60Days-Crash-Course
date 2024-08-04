// internal and external moudules and files are importing here
const mongoose=require("mongoose");
const express=require("express");
const router=express.Router();// using express Router middleware
const connection=require("../config/db");
const courseModel=require("../model/course.model");
const path = require("path");
const morgan=require("morgan");
const fs=require("fs");

// log all requests to access.log
var accessLogStream=fs.createWriteStream(path.join(__dirname,'../access.log'),{flags:'a'});
router.use(morgan('combined',{stream:accessLogStream}))
router.use(express.json());// using express json middleware here


// making get request here
router.get('/my_courses',async(req,res)=>{
    try {
       const data= await courseModel.find();// find the data
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})
// making port request here
router.post("/create",async(req,res)=>{
    try {
       const existingCourse=await courseModel.findOne({title:req.body.name});
        const newCourse=new courseModel(req.body);
        await newCourse.save()
        res.status(200).json({message:"Data added successfully"})
    } catch (error) {
       console.log(error);
       res.status(500).send(error) 
    }
})
//exporting routers from here
module.exports=router
