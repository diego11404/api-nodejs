"use strict"
let mongoose = require('./connection'),
  Schema = mongoose.Schema,
  userSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
  })
let user = mongoose.model('user', userSchema)
module.exports = user



