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
module.exports = router