"use strict"
const jwt = require('jsonwebtoken'),
      conf = require('../lib/config')

let auth = (req,res,next)=>{
  let token = req.body.token|| req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token,conf.phace,(err,decoded)=>{
      if(err) throw err
        req.decoded= decoded
        next()
    })
  }else{
    res.status(403).json({error : 'necesitas tener el token, to be login'})
  }
}      

module.exports = auth