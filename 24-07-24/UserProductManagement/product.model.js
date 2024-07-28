const mongoose=require("mongoose");// importing mongoose module
// define the schema for a product
const productSchema=mongoose.Schema({
    title:{type:String},
    color:{type:String},
    shape:{type:String},
    height:{type:Number},
    width:{type:Number}
},{
versionKey:false
})
// create a model from the schema
const productModel=mongoose.model("product",productSchema);
// export the model for use in other parts of the applications
module.exports=productModel