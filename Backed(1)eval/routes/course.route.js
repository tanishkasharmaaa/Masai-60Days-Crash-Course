const mongoose=require("mongoose");
const express=require("express");
const router=express.Router();
const connection=require("../config/db");
const courseModel=require("../model/course.model");
const path = require("path");
const morgan=require("morgan");
const fs=require("fs");


var accessLogStream=fs.createWriteStream(path.join(__dirname,'../access.log'),{flags:'a'});
router.use(morgan('combined',{stream:accessLogStream}))
router.use(express.json());



router.get('/my_courses',async(req,res)=>{
    try {
       const data= await courseModel.find();
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

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

module.exports=router