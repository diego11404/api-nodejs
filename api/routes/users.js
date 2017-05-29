"use strict"
const express = require('express'),
  router = express.Router(),
  User = require('../lib/model/user'),
  crypto = require('crypto'),
  algorithm = 'aes-256-ctr',
  password = 'p@ssw0rd'

class allEncrypt {

  encryp(text) {
    let cipher = crypto.createCipher(algorithm, password),
      crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
  }
  descrypt(text) {
    let decipher = crypto.createDecipher(algorithm, password),
      dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
  }

}
let cryptoMethods = new allEncrypt()


router.post('/', function (req, res, next) {
  let reqUser = req.body
  User.findOne({ username: reqUser.username }, (err, rpt) => {
    if (err) throw err
    else if (rpt) {
      if (cryptoMethods.descrypt(rpt.password) === reqUser.password)
        res.status(201).json({ user: rpt })
      else {
        res.status(403).json({ error: 'El usuario con el username '+rpt.username+' ya existe' })
      }
    }
    else {
      new User({
        username: reqUser.username,
        password: cryptoMethods.encryp(reqUser.password)
      }).save((err, user) => {
        res.status(201).json({
          user: user.username
        })
      })
    }
  })

});
router.get('/', (req, res, next) => {
  User.find({}, (err, rpt) => {
    if (err) throw err
    res.json({
      user: rpt
    })
  })
})
module.exports = router
