const movieModel = require("../models/movie.model");
const Movie=require("../models/movie.model");

exports.createMovies=async(req,res)=>{
    try {
        const movie=new Movie(req.body);
        await movie.save();
        res.status(201).send(movie);
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.getMovies=async(req,res)=>{
    try {
        const {title,rating,q,sortBy,page=1,limit=10}=req.query;
        const filter={};
        if(title)filter.title=title;
        if(rating)filter.rating=rating;
        if(q)filter.title=new RegExp(q,'i');

        const movies=await Movie.find(filter).sort(sortBy).skip((page-1)*limit).limit(Number(limit));
        res.send(movies);
    } catch (error) {
        res.status(500).send(error)
    }

}

exports.getMoviesById=async(req,res)=>{
    try {
        const movie=await movieModel.findById(req.params.id);
        if(!movie)return res.status(404).send();
        res.send(movie);
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.updateMovie=async(req,res)=>{
    try {
        const movie=await movieModel.findByIdAndUpdate({_id:req.params.id},req.body);
if(!movie)return res.status(404).send();
res.send(movie)
       // await movie.save();

    } catch (error) {
        res.send(error)
    }
}

exports.deleteMovie=async (req,res)=>{
    try {
       const movie=await Movie.findByIdAndUpdate(req.params.id);
       if(!movie)return res.status(404).send();
       res.send(movie) 
    } catch (error) {
        res.status(500).send(error)
    }
}