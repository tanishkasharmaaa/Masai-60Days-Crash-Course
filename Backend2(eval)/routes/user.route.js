const express=require("express");
const UserRouter=express.Router();
const userController=require("../controllers/userController")

UserRouter.use(express.json())

UserRouter.post('/register',userController.register)
UserRouter.post('/login',userController.login)

module.exports=UserRouter