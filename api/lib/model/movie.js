"use strict"
let mongoose = require('mongoose'),
  Schema = mongoose.Schema,

  movie = new Schema({
    title: String,
    year: String
  }),
  mov = mongoose.model('movie', movie)
module.exports = mov



