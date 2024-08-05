const mongoose=require("mongoose");
const movieSchema=mongoose.Schema({
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    genre: { type: String },
    releaseDate: { type: Date }
});

const movieModel=mongoose.model("movie",movieSchema);

module.exports=movieModel