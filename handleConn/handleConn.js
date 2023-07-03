const { DisconnectReason } = require("@whiskeysockets/baileys");
const { Boom } = require('@hapi/boom');
const see = console.log



  async function handleConn(vufi, update, runBot) {

try {
    
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect.error = Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
      // reconnect if not logged out
      if (shouldReconnect) {
        await runBot()
      }
      
    } else if (connection === 'open') {
      console.log('opened connection')

    }

    
} catch (err) {
  see(err)
  runBot()
}

    
  }



  

module.exports = {
  handleConn
}