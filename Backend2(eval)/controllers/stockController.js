const express = require("express");
const ActiveOrdersModel = require("../models/activeOrders.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Add order functionality
exports.addOrder = async (req, res) => {
  try {
    let { orderType, symbol, stock, quantity, minPrice, willingPrice } = req.body;

    // Extract and verify JWT token
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let userid = decoded.userID;

    // Create a new order
    let order = new ActiveOrdersModel({
      orderType:orderType.toLowerCase(),
      symbol:symbol.toLowerCase(),
      stock:symbol.toLowerCase(),
      quantity,
      minPrice,
      willingPrice,
      userID: userid,
    });

 
    await order.save();
    res.status(201).json({ order });

  } catch (error) {
    res.status(500).json({ error: 'Error adding order' });
  }
};

// Matching orders functionality
exports.match = async (req, res) => {
  try {
  
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let userid = decoded.userID;

    // Fetch the current user's orders
    let userOrders = await ActiveOrdersModel.find({ userID: userid, status: 'pending' });

    // Fetch all other pending orders in the system (excluding current user's orders)
    let otherOrders = await ActiveOrdersModel.find({ userID: { $ne: userid }, status: 'pending' });

    let matchFound = false;

    // Loop through user orders and try to find matching orders from other users
    for (let userOrder of userOrders) {
      for (let otherOrder of otherOrders) {
        if (
          userOrder.orderType !== otherOrder.orderType && // Opposite order types (buy/sell)
          userOrder.symbol === otherOrder.symbol && // Matching symbol
          userOrder.stock === otherOrder.stock && // Matching stock
          userOrder.willingPrice === otherOrder.willingPrice // Matching willing price
        ) {
          matchFound = true;

          if (userOrder.quantity === otherOrder.quantity) {
            // Quantities are exactly the same, mark both as complete
            await ActiveOrdersModel.updateOne({ _id: userOrder._id }, { status: 'complete' });
            await ActiveOrdersModel.updateOne({ _id: otherOrder._id }, { status: 'complete' });
            console.log(`Order matched and fully completed: ${userOrder._id} and ${otherOrder._id}`);
          } else if (userOrder.quantity > otherOrder.quantity) {
            // User order has more quantity, complete the other order and reduce quantity on user order
            let remainingQuantity = userOrder.quantity - otherOrder.quantity;
            await ActiveOrdersModel.updateOne({ _id: otherOrder._id }, { status: 'complete' });
            await ActiveOrdersModel.updateOne({ _id: userOrder._id }, { quantity: remainingQuantity });
            console.log(`Order partially matched. ${otherOrder._id} completed, ${userOrder._id} updated with remaining quantity: ${remainingQuantity}`);
          } else {
            // Other order has more quantity, complete the user order and reduce quantity on other order
            let remainingQuantity = otherOrder.quantity - userOrder.quantity;
            await ActiveOrdersModel.updateOne({ _id: userOrder._id }, { status: 'complete' });
            await ActiveOrdersModel.updateOne({ _id: otherOrder._id }, { quantity: remainingQuantity });
            console.log(`Order partially matched. ${userOrder._id} completed, ${otherOrder._id} updated with remaining quantity: ${remainingQuantity}`);
          }
        }
      }
    }

    // If a match was found, send a success response
    if (matchFound) {
      res.status(200).json({ message: 'Matching complete' });
    } else {
      res.status(200).json({ message: 'No matching orders found' });
    }

  } catch (error) {
    console.error("Error during order matching:", error);
    res.status(500).json({ error: 'An error occurred while matching orders' });
  }
};



// Handler to update an existing stock order
exports.updateStock = async (req, res) => {
  try {
   
    let updatedOrder = await ActiveOrdersModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true } 
    );

   
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
   
    console.error("Error updating order:", error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};



// Handler to delete a stock order
exports.deleteStock = async (req, res) => {
  try {
   
    let deletedOrder = await ActiveOrdersModel.findByIdAndDelete({ _id: req.params.id });

   
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted", deletedOrder });
  } catch (error) {
    
    console.error("Error deleting order:", error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
