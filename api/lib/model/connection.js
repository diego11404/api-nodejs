const mongoose = require('mongoose'),
      conf= require('../config')
mongoose.connect(`mongodb://${conf.host}/${conf.database}`)
mongoose.connection.on('connected',()=>{
  console.log('conectado a mongodb');
})
module.exports= mongoose