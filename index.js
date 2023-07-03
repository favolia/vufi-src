const {
    handleConn
} = require('./handleConn/handleConn');

const { msgHandler } = require('./msgHandler')
const { callBlock } = require('./lib/msgFunction/simpleFunc')



function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


const {
    default: makeWASocket,
    useMultiFileAuthState,
  downloadMediaMessage,
  delay
} = require("@whiskeysockets/baileys");

const fs = require('fs');
const path = require('path');
const pino = require('pino')
const aliveBot = require('./handleConn/server')


const see = console.log;

// ganti nomer owner


async function runBot() {
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState('./vufiSession')
    const vufi = makeWASocket({
        printQRInTerminal: true,
        logger: pino({
            level: 'silent'
        }),
        browser: ['vufi Here!', 'Safari', '1.0.0'],
        auth: state,
        linkPreviewImageThumbnailWidth: 300,
        generateHighQualityLinkPreview: true,

    });

    vufi.ev.on('connection.update', (update) => handleConn(vufi, update, runBot));

    vufi.ev.on('creds.update', saveCreds);

    // Message Handler 
    vufi.ev.on('messages.upsert', async ({ messages,type }) => msgHandler(vufi ,messages))
  
    vufi.ev.on('call', async (call) => {
        see(call)
        const callFrom = call[0].chatId
        const callStatus = call[0].status

        if (callStatus === 'offer') {
            see('ada yg nelpon')
            vufi.rejectCall(call[0].id, call[0].from)
            vufi.sendMessage(callFrom, {
                text: 'anda akan di blokir, karna telah menelpon bot!'
            })
            callBlock(callFrom)
            await delay(3000)
            await vufi.updateBlockStatus(callFrom, "block")

        }

    })

}
// run in main file


aliveBot()
runBot()