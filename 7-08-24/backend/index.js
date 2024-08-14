const mongoose=require("mongoose");
const express=require('express');
const dotenv=require("dotenv").config();
const port=process.env.PORT;
const connection=require("./configs/db")
const app=express();
const userRouter=require("./routes/user.routes");
const cors=require("cors");
const libraryRouter=require("./routes/library.routes")

app.use(cors())
app.use("/user",userRouter)
app.use("/library",libraryRouter)

app.listen(port,async()=>{
    try {
        await connection
        console.log(`Server connection to db and running at port ${port}`)
    } catch (error) {
        res.status(400).send(error)
    }
})
