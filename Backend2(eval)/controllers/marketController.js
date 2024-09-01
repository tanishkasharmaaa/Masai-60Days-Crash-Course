const express = require("express");
const jwt = require("jsonwebtoken");
const ActiveOrdersModel = require("../models/activeOrders.model");
const dotenv = require("dotenv");
dotenv.config();

// Handler to add a new stock order
exports.addStock = async (req, res) => {
  let { orderType, symbol, stock, quantity, minPrice, willingPrice } = req.body;
  let token = req.headers.authorization.split(" ")[1];
  let userid;

  // Verify JWT token to authenticate user and extract userID
  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decode) {
    if (err) {
      return res.status(400).json({ err });
    }
    if (decode) {
      userid = decode.userID;
      console.log(userid);
    }
  });

  try {
    // Create a new stock order
    let order = new ActiveOrdersModel({
      orderType: orderType.toLowerCase(),
      symbol: symbol.toLowerCase(),
      stock: stock.toLowerCase(), // Corrected from symbol to stock
      quantity,
      minPrice,
      willingPrice,
      userID: userid,
    });

    // Save the order to the database
    await order.save();
    res.status(201).json({ order });
  } catch (error) {
    // Handle errors (e.g., database issues)
    res.status(500).json({ error });
  }
};

// Handler to update an existing stock order
exports.updateStock = async (req, res) => {
  try {
    // Update the order by ID and save changes
    let market = await ActiveOrdersModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true } // Return the updated document
    );
    res.status(200).json(market);
  } catch (error) {
    // Handle errors (e.g., database issues)
    res.status(500).json({ error });
  }
};

// Handler to delete a stock order
exports.deleteStock = async (req, res) => {
  try {
    // Delete the order by ID
    let market = await ActiveOrdersModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "stock deleted", market });
  } catch (error) {
    // Handle errors (e.g., database issues)
    res.status(500).json({ error });
  }
};

// Handler to retrieve all pending stock orders
exports.allStocks = async (req, res) => {
  try {
    // Fetch all orders with status 'pending'
    let market = await ActiveOrdersModel.find({ status: "pending" });
    res.status(200).json(market);
  } catch (error) {
    // Handle errors (e.g., database issues)
    res.status(500).json({ error });
  }
};

// Handler to retrieve transaction history for the authenticated user
exports.transactionHistory = async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let userid;

  // Verify JWT token to authenticate user and extract userID
  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decode) {
    if (err) {
      return res.status(400).json({ err });
    }
    if (decode) {
      userid = decode.userID;
    }
  });

  try {
    // Fetch completed transactions for the user
    let transactionHistory = await ActiveOrdersModel.find({ userID: userid, status: "complete" });
    res.status(200).json(transactionHistory);
  } catch (error) {
    // Handle errors (e.g., database issues)
    res.status(400).json({ error });
  }
};

// Handler to manage and filter the order book
exports.orderBookManagement = async (req, res) => {
  let { stock, orderType, price, q } = req.query;
  
  try {
    let filter = {};

    // Add filters based on query parameters
    if (stock) {
      filter.stock = stock.toLowerCase();
    }
    if (orderType) {
      filter.orderType = orderType.toLowerCase();
    }
    if (price) {
      // Handle price filtering (assuming price is in the format "min-max")
      let [minPrice, maxPrice] = price.split('-').map(Number);
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        filter.willingPrice = { $gte: minPrice, $lte: maxPrice };
      } else if (!isNaN(minPrice)) {
        filter.willingPrice = { $gte: minPrice };
      } else if (!isNaN(maxPrice)) {
        filter.willingPrice = { $lte: maxPrice };
      }
    }
    if (q) {
      // Handle search query, if provided (search by symbol or stock name)
      filter.$or = [
        { symbol: new RegExp(q, 'i') }, // Case-insensitive search for symbol
        { stock: new RegExp(q, 'i') }   // Case-insensitive search for stock
      ];
    }

    // Fetch the filtered orders from the database
    let orders = await ActiveOrdersModel.find(filter);

    // Send the filtered orders as a response
    res.status(200).json(orders);

  } catch (error) {
    // Handle errors (e.g., database query issues)
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
