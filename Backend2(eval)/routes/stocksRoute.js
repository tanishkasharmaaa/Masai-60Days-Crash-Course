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
stockRouter.get('/AllStockInMarket',authMiddleware,marketController.allStocks)
stockRouter.post('/match', authMiddleware, stockController.match);
stockRouter.get('/transactionHistory',authMiddleware,marketController.transactionHistory)



module.exports=stockRouter