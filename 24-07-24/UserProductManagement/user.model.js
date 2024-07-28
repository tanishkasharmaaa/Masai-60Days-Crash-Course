const mongoose=require("mongoose");// importing mongoose module
// define the schema for a user
const userSchema=mongoose.Schema({
    name:{type:String,unique:true},// Name field ,must be unique
    age:Number,// Age field , type is Number
    email:String,// Email field , type is string
    gender:String// gender field , type is string
})
// create a model from the schema
const userModel=mongoose.model("user",userSchema);
// export the model for use in other parts of the applications
module.exports=userModel