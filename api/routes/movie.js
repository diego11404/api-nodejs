"use strict"
let express = require('express'),
  router = express.Router(),
  _ = require('lodash');
var movieDb = {}

router.post('/', (req, res, next) => {

  if (!req.body) {
    res.status(403)
      .json({
        error: true,
        message: 'movie no existe'
      })
  }
  let movie = req.body.movie;

  let id = movie.id = Date.now();
  movieDb[id] = movie
  res.status(201)
    .json({
      movie: movie
    })
    console.log(movieDb[id]);

})

router.get('/',(req, res, next)=>{

  res.status(201)
      .json({
      allmovies : _.values(movieDb)
      })

  
})
router.get('/:id',(req,res,next)=>{
  let id = req.params.id
  res.status(200)
    .json({
      movieId: movieDb[id]
    })
})
module.exports = router