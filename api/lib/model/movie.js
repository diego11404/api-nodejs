"use strict"
let mongoose = require('./connection'),
  Schema = mongoose.Schema,

  movie = new Schema({
    title: {type :String, required: true},
    year: {type :String, required: true}
  })
  let mov = mongoose.model('movie2', movie)
module.exports = mov



