const see = console.log;
const {
    downloadMediaMessage
} = require('@whiskeysockets/baileys')
const pino = require('pino')
const logger = pino()
const sharp = require('sharp')
const stickerPath = './sticker/sticker.webp'

async function sticker(vufi, from, m) {

  const msgId = m.key;
  
     const sendLaugh = async () => {
     await vufi.sendMessage(from, {react: {text: "😂", key: msgId}})
    }

    const sendWait = async () => {
      await vufi.sendMessage(from, {react: {text: "🕝", key: msgId}})
    }

    const sendDone = async () => {
      await vufi.sendMessage(from, {react: {text: "✅", key: msgId}})
    }

  

 async function sendSticker(path) {
    await vufi.sendMessage(from, {
          sticker: {
          url: path,
        },
          mimetype: 'image/webp',
        },
        {
          quoted: m
    })
  } 
      
    let buffer = await downloadMediaMessage(m, "buffer", {}, {
        logger
    })

        sharp(buffer).resize(2000, 2000)
            .toFormat('webp')
            .toFile(stickerPath, async (err) => {
                if (err) {
                    see(err);
                } else {
                    see('File output.webp berhasil dibuat');
                    sendSticker(stickerPath)
                }
            });

  const sticBuffer = await sharp(buffer).toFormat('webp').toBuffer()

  see(sticBuffer)
  
  
}

  module.exports = {
    sticker
  }