// internal and external moudules and files are importing here

const express=require("express");
const port=3000;
const server=express()
const connection=require("./config/db");
const userRouter=require("./routes/course.route");


// making connection of server to database
connection.then(()=>{
    console.log('connected to mongodb');

})
.catch((error)=>{
    console.log('error while connection',error)
})



// using middleware here
server.use('/course',userRouter);

// starting server here
server.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})
