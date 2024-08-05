const express=require("express");
const router=express.Router();
const movieController=require("../controllers/movieController")


router.use(express.json());

router.post('/movies',movieController.createMovies)
router.get('/movies',movieController.getMovies)
router.get('/movies/:id',movieController.getMoviesById);
router.put('/movies/:id',movieController.updateMovie);
router.delete('/movies/:id',movieController.deleteMovie)

module.exports=router