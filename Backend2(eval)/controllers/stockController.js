const express=require("express");
const ActiveOrdersModel=require("../models/activeOrders.model")
const jwt=require("jsonwebtoken");
const userModel=require("../models/user.model")
const dotenv=require("dotenv");
// const StockModel = require("../models/stock.model");
dotenv.config()

exports.addOrder=async(req,res)=>{
    let{orderType,symbol,stock,quantity,minPrice,willingPrice}=req.body;
 let token=req.headers.authorization.split(" ")[1];
    let userid;
jwt.verify(token,process.env.JWT_SECRET_KEY,async function(err,decode){
        if(err){
            res.status(400).json({err})
        }
        
        if(decode){
         userid=decode.userID
       console.log(userid)
        }
    
    }
        )

    try {

       
      let order=new ActiveOrdersModel({
        orderType,
    symbol,
    stock,
    quantity,
    minPrice,
    willingPrice,
    userID:userid
     });
     await order.save();
         res.status(201).json({order}) 
    
     
      
    } catch (error) {
        res.status(500).json({error})
    }
}


