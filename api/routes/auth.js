const express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  conf = require('../lib/config'),
  user = require('../lib/model/user'),
  userRoute = require('../routes/users'),
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

router.post('/', (req, res, next) => {
  let _user = req.body
  user.findOne({ username: _user.username }, (err, rpt) => {
    if (err) throw err
    else if (rpt) {
      if (rpt.password === cryptoMethods.encryp(_user.password)) {
        let token = jwt.sign(rpt, conf.phace, { expiresIn: '24hr' })
        console.log(token);
        res.status(201).json({ token: token })
      }
    } else {
      res.json({ error: 'no existe el usuario' })
    }
  })
})

module.exports = router