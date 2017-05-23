"use strict"
const mongoose = require('./connection'),
  schema = mongoose.Schema,

  movie = new schema({
    title: { type: String, require: true },
    year: { type: String, require: true }
  })
  module.exports =  mongoose.model('movie', movie)



