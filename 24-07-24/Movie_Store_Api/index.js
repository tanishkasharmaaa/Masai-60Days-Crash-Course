const mongoose=require("mongoose");
const express=require("express");
const app=express();
const port=5000
const connection=require("./configs/db");
const router=require("./routes/routes")

connection.then(()=>{
    console.log(`connected with db`)
})
.catch((error)=>{
    console.log(`error in making connection`,error);
})

app.use("/movie",router)

app.listen(port,()=>{
    console.log(`server is running `)
})