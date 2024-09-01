const express=require("express");
const stockRouter=express.Router();
const stockController=require("../controllers/stockController")

stockRouter.use(express.json());

stockRouter.post('/addOrder',stockController.addOrder)

module.exports=stockRouter