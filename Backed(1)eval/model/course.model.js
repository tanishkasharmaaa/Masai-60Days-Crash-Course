const mongoose=require("mongoose");
const courseSchema=mongoose.Schema({
    Id:{type:String},
    title:{type:String},
    category:{type:String},
    difficulty:{type:String},
    description:{type:String}
});

const courseModel=mongoose.model("course",courseSchema);
module.exports=courseModel
