const mongoose=require("mongoose");
const express=require("express");
const port=4000;
const server=express()
const connection=require("./config/userDB");

const userRouter=require("./routes/user.route");
const fs=require("fs");


connection.then(()=>{
    console.log('connected to mongodb');

})
.catch((error)=>{
    console.log('error while connection',error)
})




server.use(userRouter);

server.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})
