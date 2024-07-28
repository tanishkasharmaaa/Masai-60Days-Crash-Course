const express=require("express");// importing express module
const server=express();// creating an instance of an express application
const port=4000;// defining a port number
const productRoute=require("./product.routes")// importing the products route
const connection=require('./config/db');//importing the database connection

// establish the connection to MongoDB
connection.then(()=>{
    console.log('connected to mongodb')// log a message if the connection is successful
}).catch((error)=>{
    console.log('error connecting to mongoDB : ',error)// log a message if the connection is failed
})
// Middleware to use routes
server.use('/products',productRoute)

// start server and listen on the specified port 
server.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})