const fs = require('fs')
const see = console.log

const lol = {
  key: {
    remoteJid: '622150942317@s.whatsapp.net',
    fromMe: false,
    id: 'A9829E78CC1E671BDC',
    participant: undefined
  },
  messageTimestamp: 1686903187,
  pushName: '622150942317',
  broadcast: false,
  message: Message {
    templateMessage: TemplateMessage {
      hydratedTemplate: [HydratedFourRowTemplate],
      templateId: '764162288624681'
    },
    messageContextInfo: MessageContextInfo {
      deviceListMetadata: [DeviceListMetadata],
      deviceListMetadataVersion: 2
    }
  },
  verifiedBizName: 'Shopee'
}


// ======


const templates = {
  message: {
    templateMessage: {
      hydratedFourRowTemplate: {
        hydratedButtons: [
          {
            urlButton: {
              displayText: 'ig dais',
              url: 'https://instagram.com/defavolia'
            },
            index: 0
          }
        ],
        imageMessage: {
          mimetype: 'image/jpeg',
          caption: 'testttt',
          jpegThumbnail: convertToUint8Array('./img/vufi.jpeg')
        },
        hydratedContentText: 'dais content text',
        hydratedFooterText: 'dais footer'
      },
      hydratedTemplate:: {
        hydratedButtons: [
          {
            urlButton: {
              displayText: 'ig dais',
              url: 'https://instagram.com/defavolia'
            },
            index: 0
          }
        ],
        imageMessage: {
          mimetype: 'image/jpeg',
          caption: 'testttt',
          jpegThumbnail: convertToUint8Array('./img/vufi.jpeg')
        },
        hydratedContentText: 'dais content text',
        hydratedFooterText: 'dais footer'
      },
    }
  }
}

TemplateMessage {
  hydratedFourRowTemplate: HydratedFourRowTemplate {
    hydratedButtons: [ [HydratedTemplateButton] ],
    imageMessage: ImageMessage {
      interactiveAnnotations: [],
      scanLengths: [],
      url: 'https://mmg.whatsapp.net/d/f/AjNCf5MZcqOhV0NGX9GDvoZ_YHfrYJzy4z4TB9JkWf2_.enc',
      mimetype: 'image/jpeg',
      caption: '*dais1455, kamu dapat Voucher Eksklusif!*\n' +
        '\n' +
        'Ambil *Voucher Gratis Ongkir Min. Belanja 10RB* kamu!\n' +
        '\n' +
        'Yuk, belanja sebelum hangus! 😜',
      fileSha256: [Uint8Array],
      fileLength: [Long],
      mediaKey: [Uint8Array],
      fileEncSha256: [Uint8Array],
      directPath: '/v/t62.7118-24/30692055_654115916054296_4030058312463797306_n.enc?ccb=11-4&oh=01_AdRIeX-YCqzH-OZb94TkRdVrFW3hvAbwT9jlxm6w97voQQ&oe=64B1EAFD',
      mediaKeyTimestamp: [Long],
      jpegThumbnail: [Uint8Array]
    },
    hydratedContentText: '*dais1455, kamu dapat Voucher Eksklusif!*\n' +
      '\n' +
      'Ambil *Voucher Gratis Ongkir Min. Belanja 10RB* kamu!\n' +
      '\n' +
      'Yuk, belanja sebelum hangus! 😜',
    hydratedFooterText: 'Balas "Berhenti" untuk berhenti berlangganan.'
  },
  hydratedTemplate: HydratedFourRowTemplate {
    hydratedButtons: [ [HydratedTemplateButton] ],
    imageMessage: ImageMessage {
      interactiveAnnotations: [],
      scanLengths: [],
      url: 'https://mmg.whatsapp.net/d/f/AjNCf5MZcqOhV0NGX9GDvoZ_YHfrYJzy4z4TB9JkWf2_.enc',
      mimetype: 'image/jpeg',
      caption: '*dais1455, kamu dapat Voucher Eksklusif!*\n' +
        '\n' +
        'Ambil *Voucher Gratis Ongkir Min. Belanja 10RB* kamu!\n' +
        '\n' +
        'Yuk, belanja sebelum hangus! 😜',
      fileSha256: [Uint8Array],
      fileLength: [Long],
      mediaKey: [Uint8Array],
      fileEncSha256: [Uint8Array],
      directPath: '/v/t62.7118-24/30692055_654115916054296_4030058312463797306_n.enc?ccb=11-4&oh=01_AdRIeX-YCqzH-OZb94TkRdVrFW3hvAbwT9jlxm6w97voQQ&oe=64B1EAFD',
      mediaKeyTimestamp: [Long],
      jpegThumbnail: [Uint8Array]
    },
    hydratedContentText: '*dais1455, kamu dapat Voucher Eksklusif!*\n' +
      '\n' +
      'Ambil *Voucher Gratis Ongkir Min. Belanja 10RB* kamu!\n' +
      '\n' +
      'Yuk, belanja sebelum hangus! 😜',
    hydratedFooterText: 'Balas "Berhenti" untuk berhenti berlangganan.'
  }
}
{
  key: {
    remoteJid: '622150942317@s.whatsapp.net',
    fromMe: false,
    id: 'F9FFB5A440983E9262',
    participant: undefined
  },
  messageTimestamp: 1686903971,
  pushName: '622150942317',
  broadcast: false,
  message: Message {
    conversation: 'Kamu lagi mau checkout produk apa, nih? Shopee udah siapkan PROMO menarik buat kamu hari ini, lho! Jadi, langsung checkout aja sekarang 👉\n' +
      '\n' +
      'Ketik “1” atau “2” untuk informasi selengkapnya:\n' +
      '1. Belanja promo menarik ⚡️\n' +
      '2. Saya ingin bertanya 💬',
    messageContextInfo: MessageContextInfo {
      deviceListMetadata: [DeviceListMetadata],
      deviceListMetadataVersion: 2
    }
  },
  verifiedBizName: 'Shopee'
}

