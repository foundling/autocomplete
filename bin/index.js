const path = require('path')
const server = require(path.join(__dirname,'../server/server.js'))
server.start(process.env.PORT || 3000)
