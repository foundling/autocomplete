const express = require('express')
const app = express()
const PORT = 3000
const fs = require('fs')
const dataPath = '/usr/share/dict/propernames' 
const AutoComplete = require('./autocomplete')

let store = [];
let ac;

app.use('/static',express.static('public'))

app.get('/', (req, res) => {

  res.set('Content-Type','text/html')

  fs.readFile('server/templates/index.html', (err, data) => {
    if (err)
      throw new Error(err)
    else
      res.send(data)
  })

})

app.get('/api/autocomplete', (req, res) => {

  const { q } = req.query
  const results = ac.find(q)
  const payload = { 
    found: Boolean(results) 
  }

  res.set('Content-Type', 'application/json')

  res.send(JSON.stringify(payload))

})

function initStore() {

  const rs = fs.createReadStream(dataPath)
  const upMsg = () => {
    console.log(`Up! Serving ${store.length} names.`) 
  }

  rs.on('data', (chunk) => {
      store = store.concat(chunk.toString().split('\n')) 
  })

  rs.on('end', () => {
    ac = new AutoComplete(store)
    ac.build()
    app.listen(process.env.PORT || PORT, upMsg)
  })

  rs.on('error', (err) => {
    throw new Error(err)
  })

}

module.exports = exports = { start: initStore }
