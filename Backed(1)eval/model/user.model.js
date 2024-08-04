const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    id:{type:String},
    username:{type:String},
    password:{type:String},
   enrolledCourses:{type:String}
})

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;
