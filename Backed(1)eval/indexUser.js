// internal and external moudules and files are importing here
const mongoose=require("mongoose");
const express=require("express");
const port=4000;
const server=express()
const connection=require("./config/userDB");

const userRouter=require("./routes/user.route");
const fs=require("fs");

// making connection of server to database
connection.then(()=>{
    console.log('connected to mongodb');

})
.catch((error)=>{
    console.log('error while connection',error)
})



// using middleware here
server.use(userRouter);
// starting server here
server.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})
