const express = require("express");
const jwt=require("jsonwebtoken")
const ActiveOrdersModel = require("../models/activeOrders.model");

exports.addStock = async (req, res) => {
  let { orderType, symbol, stock, quantity, minPrice, willingPrice } = req.body;
  let token = req.headers.authorization.split(" ")[1];
  let userid;
  jwt.verify(token, process.env.JWT_SECRET_KEY, async function (err, decode) {
    if (err) {
      res.status(400).json({ err });
    }

    if (decode) {
      userid = decode.userID;
      console.log(userid);
    }
  });
  try {
    let order = new ActiveOrdersModel({
      orderType,
      symbol,
      stock,
      quantity,
      minPrice,
      willingPrice,
      userID: userid,
    });
    await order.save();
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ error });
  }
};



exports.updateStock = async (req, res) => {
  try {
    let market = await ActiveOrdersModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    await market.save();
    res.status(200).json(market);
  } catch (error) {
    res.status(500).json({ error });
  }
};




exports.deleteStock = async (req, res) => {
  try {
    let market = await ActiveOrdersModel.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({ message: "stock deleted", market });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.allStocks = async (req, res) => {
  try {
    let market = await ActiveOrdersModel.find();
    res.status(200).json(market);
  } catch (error) {
    res.status(500).json({ error });
  }
};
