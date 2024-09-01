const express=require("express");
const StockModel = require("../models/stock.model");

exports.addStock=async(req,res)=>{
    try {
        let market=new StockModel(req.body);
        await market.save();
        res.status(201).json({market})
    } catch (error) {
        res.status(500).json({error})
    }
}


exports.updateStock=async(req,res)=>{
    try {
        let market=await StockModel.findByIdAndUpdate({_id:req.params.id},req.body);
        await market.save();
        res.status(200).json(market)
    } catch (error) {
        res.status(500).json({error})

    }
}

exports.deleteStock=async(req,res)=>{
    try {
        let market=await StockModel.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({message:"stock deleted",market})
    } catch (error) {
        res.status(500).json({error})
    }
}


exports.allStocks=async(req,res)=>{
    try {
        let market=await StockModel.find();
        res.status(200).json(market)
    } catch (error) {
        res.status(500).json({error})
    }
}