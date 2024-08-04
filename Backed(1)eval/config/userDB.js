const mongoose=require("mongoose");// importing mongoose
const connection=mongoose.connect('mongodb://127.0.0.1:27017/user');// making with mongodb data
module.exports=connection//exporting connection