const mongoose=require("mongoose");// import of mongoose
// defining structure of course Data in courseSchema
const courseSchema=mongoose.Schema({
    Id:{type:String},
    title:{type:String},
    category:{type:String},
    difficulty:{type:String},
    description:{type:String}
});
// creating model of courseSchema
const courseModel=mongoose.model("course",courseSchema);
// exporting courseModel
module.exports=courseModel

