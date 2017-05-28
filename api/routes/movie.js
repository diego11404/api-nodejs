"use strict"
const express = require('express'),
  router = express.Router(),
  _ = require('lodash')
 var movieSchema = require('../lib/model/movie')

router.post('/', (req, res, next) => {

  let movie = req.body
  new movieSchema({
    title: movie.title,
    year: movie.year
  }).save((err, data) => {
    if (err) throw err
    res.status(201)
      .json({ movie: data })
  })
})

router.get('/', (req, res, next) => {
  movieSchema.find({}, (err, rpt) => {
    res.status(201)
      .json({ allmovies: rpt })
  })

})
router.get('/:id', (req, res, next) => {
  let id = req.params.id
  movieSchema.findOne({ _id: id }, (err, rpt) => {
    res.status(200)
      .json({
        movieId: rpt
      })
  })
})
router.put('/:id', (req, res, next) => {
  console.log("BODY", req.body);

  let id = req.params.id
  let data ={
    title: req.body.title,
    year: req.body.year
  }
  movieSchema.findByIdAndUpdate(id, data,{ new: true }, (err, rpt) => {
    if (err) throw err
    res.status(200).json({
      movie: rpt
    })
  })

})
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  movieSchema.findByIdAndRemove(id,(err,rpt)=>{
    res.status(400).json({})
  })
})
module.exports = router