const express=require("express");
const stockRouter=express.Router();
const stockController=require("../controllers/stockController");
const authMiddleware = require("../middleware/authMiddleware");
const marketController=require("../controllers/marketController");
const adminMiddleware = require("../middleware/adminMiddleware");

stockRouter.use(express.json());

stockRouter.post('/addOrder',authMiddleware,stockController.addOrder);
stockRouter.post('/addStockInMarket',adminMiddleware,marketController.addStock)
stockRouter.patch('/UpdateStockInMarket/:id',adminMiddleware,marketController.updateStock)
stockRouter.delete('/DeleteStockInMarket/:id',adminMiddleware,marketController.deleteStock)
stockRouter.post('/AllStockInMarket',adminMiddleware,marketController.allStocks)


module.exports=stockRouter