const mongoose=require("mongoose"); // Importing the mongoose module
const express=require("express");// Importing the express module
const router=express.Router();// Creating an instance of the express Router
const connection=require("./config/db");// Importing the database connection
const userModel=require("./user.model")// Importing the user model

router.use(express.json())// Middleware to parse JSON request bodies

// GET route to retrieve all users
router.get('/get-user',async(req,res)=>{
    try {
        await connection;// Ensure the database connection is established
        const data=await userModel.find();//retrieve all the users
        res.send(data)// send the retrieved data as a response
    } catch (error) {
      console.log(error)  // log any error
    }
    })
    
    // POST route to create a new user
    router.post("/create-user",async(req,res)=>{
        try {
        let data=await userModel.insertMany(req.body)// Insert the request body data as a new user
        res.send("data added successfully",data)// Send a success message and the inserted data
        } catch (error) { 
            // Send any errors as a response
           res.send(error)
        }
    
    })

    router.patch("/update-user/:id",async(req,res)=>{
        try {
           await userModel.findByIdAndUpdate({_id:req.params.id},req.body)// Update the user with the given ID using the request body data
            res.send('data updated') // Send a success message
        } catch (error) {
            console.log(error)// Log any errors
        }
   
    })

    // DELETE route to delete a user by ID
    router.delete("/delete-user/:id",async(req,res)=>{
    try {
       let deletedData= await userModel.findByIdAndDelete({_id:req.params.id})// Delete the user with the given ID
        res.send("delete successfully")// Send a success message
    } catch (error) {
        console.log(error)// Log any errors
    }
    })
module.exports=router // Export the router for use in other parts of the application