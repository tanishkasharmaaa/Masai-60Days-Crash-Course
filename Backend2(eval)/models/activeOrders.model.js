const mongoose=require("mongoose");
const activeOrdersSchema=mongoose.Schema({
    orderType:{type:String,enum:["buy","sell"],required:true},
    symbol:{type:String,required:true},
    stock:{type:String,required:true},
    quantity:{type:Number,required:true},
    minPrice:{type:Number,required:true},
    willingPrice:{type:Number,required:true},
    userID:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}
})

const ActiveOrdersModel=mongoose.model("activeOrder",activeOrdersSchema);

module.exports=ActiveOrdersModel