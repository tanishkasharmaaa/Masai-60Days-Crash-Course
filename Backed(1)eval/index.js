const mongoose=require("mongoose");
const express=require("express");
const port=3000;
const server=express()
const connection=require("./config/db");
const courseModel=require("./model/course.model")
const userRouter=require("./routes/course.route");
const fs=require("fs");


connection.then(()=>{
    console.log('connected to mongodb');

})
.catch((error)=>{
    console.log('error while connection',error)
})




server.use('/course',userRouter);

server.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})
