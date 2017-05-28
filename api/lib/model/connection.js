const mongoose = require('mongoose'),
      conf= require('../config')
mongoose.connect(`mongodb:\/\/${conf.host}/${conf.database}`)
mongoose.connection.on('connected',()=>{
  console.log(`conectado a mongodb DATABASE ${conf.database}`);
})
module.exports= mongoose