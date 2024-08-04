const mongoose=require("mongoose");// import of mongoose
// defining structure of user Data in userSchema
const userSchema=mongoose.Schema({
    id:{type:String},
    username:{type:String},
    password:{type:String},
   enrolledCourses:{type:String}
})
// creating model of userSchema
const userModel=mongoose.model("user",userSchema);
// exporting courseModel
module.exports=userModel;
