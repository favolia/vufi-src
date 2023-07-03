const express = require('express')

const server = express()

server.all('/', (req, res) => {
  res.send('bot alive!')
})

function aliveBot() {
  
server.listen(3000, console.log('aktif'));

}

module.exports = aliveBot;