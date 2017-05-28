"use strict"
const express = require('express'),
  router = express.Router(),
  _ = require('lodash'),
  movie = require('../lib/model/movie')
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
  console.log("ID POST =",id);
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
router.put('/:id',(req,res,next)=>{
  let id = req.params.id;
  if(!id && !req.body){
    res.status(403)
      .json({
        error: true,
        message: 'movie no existe'
      })
  }
  let new_movie = req.body.movie;
  new_movie.id= parseInt(id,10);
  movieDb[id] = new_movie;
 
  console.log("**********",new_movie);
  res.status(200)
  res.json({
    movie : movieDb[id]
  })
})
router.delete('/:id',(req,res,next)=>{
  let id = req.params.id;

  delete movieDb[id];
  res.status(400).json({})
})
module.exports = router 