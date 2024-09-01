const mongoose=require("mongoose");
const  stockSchema=mongoose.Schema({
symbol:{type:String,required:true},
stock:{type:String,required:true},
quantity:{type:Number,required:true},
price:{type:Number,required:true},
settlePrice:{type:Number,required:true}
})

const StockModel=mongoose.model("marketStock",stockSchema);

module.exports=StockModel