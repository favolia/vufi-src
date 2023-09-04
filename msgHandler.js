
const fs = require('fs')
const see = console.log

// ------------------------------------------------------- //

// const { start, reset, stop } = require('./minecraft/mc')

const {
  sticker
} = require('./lib/converter/sticker')
const {
  hd
} = require('./lib/converter/hd')
const {
  tagAll
} = require('./lib/msgFunction/tagAll')
const {
  addUser,
  removeUser
} = require('./lib/msgFunction/simpleFunc')
const {
  searchLyrics
} = require('./lib/lyrics')
const {
  menuList
} = require('./menuList')
const { exec } = require('./lib/dev/exec')


const {
  downloadMediaMessage,
  groupAcceptInviteV4,
  delay,
  proto,
  getContentType,
  generateWAMessageFromContent
} = require('@whiskeysockets/baileys')
const sharp = require('sharp')
const pino = require('pino')
const logger = pino()
const caliph = require('caliph-api')
const chalk = require('chalk')
const axios = require('axios')
const { uploadByBuffer } = require('telegraph-uploader')
const Nishino = require('nishino-project')
// const hdiiofficial = require('hdiiofficial')
const path = require('path')
const Youtube = require('youtube-stream-url');
const Scraper = require('@yimura/scraper').default;
const ai = require('@nechlophomeriaa/chatgpt')
const { convertToUint8Array } = require('./lib/gaje/fungsiGaje')


const $get = async (input_link) => {
  try {
    const gets = await axios.get(input_link)
    return gets.data
  } catch (err) {
    return err
  }

}

// ------------------------------------------------------- //

// ====================================================== //

const ownerIg = 'instagram.com/defavolia'
const EXTRA_API = 'https://extra-api.vufi.repl.co'
const azharim = 'https://song-lyrics-api.azharimm.dev'
const timeStamp = String(Date.now())

const ownerNumber = [
  '628875090455@s.whatsapp.net',
  '6289529753080@s.whatsapp.net'
]

const botNumber = '6288804225115@s.whatsapp.net'

const blockPath = './database/usersBlock.json';
const premiumUsersPath = './database/premiumUsers.json';
const premiumGroupsPath = './database/premiumGroups.json'

let usersBlock;

if (!usersBlock) {
  const userLists = JSON.parse(fs.readFileSync(blockPath))
  usersBlock = userLists
}

fs.watchFile(blockPath, (curr, prev) => {
  if (curr.mtime.getTime() !== prev.mtime.getTime()) {
    const userLists = JSON.parse(fs.readFileSync(blockPath))
    usersBlock = userLists
  }

  see('ada perubahan di block users')
})

let usersPremium;

if (!usersPremium) {
  const userLists = JSON.parse(fs.readFileSync(premiumUsersPath))
  usersPremium = userLists
}

fs.watchFile(premiumUsersPath, (curr, prev) => {
  if (curr.mtime.getTime() !== prev.mtime.getTime()) {
    const userLists = JSON.parse(fs.readFileSync(
      premiumUsersPath))
    usersPremium = userLists
  }

  see('ada perubahan di premium users')
})

let groupsPremium;

if (!groupsPremium) {
  const groupLists = JSON.parse(fs.readFileSync(premiumGroupsPath))
  groupsPremium = groupLists
}

fs.watchFile(premiumGroupsPath, (curr, prev) => {
  if (curr.mtime.getTime() !== prev.mtime.getTime()) {
    const groupLists = JSON.parse(fs.readFileSync(
      premiumGroupsPath))
    groupsPremium = groupLists
  }

  see('ada perubahan di premium groups')
})

const formatNum = Intl.NumberFormat('en', {
  notation: 'compact',
  maximunFractionDigits: 3
})


// ====================================================== //

const msgHandler = async (vufi, messages) => {

  await delay(2000)

  const m = messages[0]
  // see(m)
  // see(m.message?.extendedTextMessage?.contextInfo.quotedMessage)

  const isMe = m.key.fromMe
  try {



    const from = m.key.remoteJid;
    const participant = m.key.participant;
    const msgId = m.key
    const pushName = m.pushName
    const messageType = Object.keys(m.message)[0]
    const businessMsgType = Object.keys(m.message)[2]
    // see(messageType)

    if (m.message?.extendedTextMessage?.matchedText) return;




    var msg = m.message?.conversation ? m.message.conversation : m
      .message.extendedTextMessage ? m.message.extendedTextMessage
      .text : m.message.imageMessage ? m.message.imageMessage
        .caption : m.message.documentMessage ? m.message
          .documentMessage.caption : null;


    const prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~`,*zxcv!?@#$%^&.\/\\©^]/.test(msg) ? msg.match(/^[!?#$,^.,/\/\\©^]/gi) : '-'

    const usersID = from.includes('@s.whatsapp.net') ? from : from
      .includes('@g.us') ? participant : null;
    const groupID = from.includes('@g.us') ? from : false

    const isBlock = usersBlock?.includes(usersID)
    const isOwner = ownerNumber.includes(usersID)
    const isUserPremium = usersPremium.includes(usersID)
    const isGroup = from.includes('@g.us') ? true : false
    const isGroupPremium = groupsPremium.includes(groupID)
    const groupDetail = groupID ? await vufi.groupMetadata(groupID) : ''
    const commands = msg?.startsWith(prefix) ? msg.replace(prefix,
      '') || '' : '';
    const command = commands?.toLowerCase().split(' ')[0] || ''

    const args = msg?.trim().split(/ +/).slice(1)
    let q = args?.join(' ')


    const replyMsg = !q ? m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.extendedTextMessage?.text ? m.message.extendedTextMessage.contextInfo.quotedMessage.extendedTextMessage.text : m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation ? m.message.extendedTextMessage.contextInfo.quotedMessage.conversation : m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage?.caption ? m.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage.caption : m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage?.caption ? m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.caption : '' : q

    // see(replyMsg)

    const phoneNum = !q ? m.message.extendedTextMessage
      ?.contextInfo?.participant ? m.message.extendedTextMessage
        .contextInfo.participant : null : q + '@s.whatsapp.net'


    const actionGroup = async ({ targetNumber = phoneNum?.replace('@s.whatsapp.net', '') }) => {
      const [IsOnWhatsapp] = await vufi.onWhatsApp(targetNumber)
      if (IsOnWhatsapp?.exists) {
        console.log(`${targetNumber} exists on WhatsApp, as jid: ${IsOnWhatsapp.jid}`)
      } else {
        reply('gada')
      }
      // see(IsOnWhatsapp)
    }




    if (isMe) return;
    if (!isOwner) return;


    // log session

    const _log = {
      userNumber: usersID?.replace('@s.whatsapp.net', ''),
      username: pushName || '_anonim',
      groupID: groupID ? groupID : '-',
      groupName: groupDetail.subject || '!isNotGroup'
    }

    // see({ groupDetail });
    if (command) see(chalk`{green » {cyan ${_log.userNumber} ${_log.username}}} {yellowBright » } {${usersID.includes(ownerNumber) ? 'red' : 'white'} ${'.' + command}} {white ${q ? q : ''}}`);


    // end log session

    const reply = async (text) => {

      vufi.sendMessage(from, {
        text: text
      }, {
        quoted: m
      })
    }

    const sendMsg = async (text) => {

      vufi.sendMessage(from, {
        text: text
      })
    }

    const sendAudio = async (text) => {

      await vufi.sendMessage(from, { audio: { url: text }, mimetype: 'audio/mp4', fileName: 'lol' }, { quoted: m })
    }

    const sendError = async (err) => {
      const stringified = JSON.stringify(err)
      vufi.sendMessage(from, {
        text: stringified
      }, {
        quoted: m
      })
    }


    function sendMenu() {

      vufi.relayMessage(from, {
        extendedTextMessage: {
          text: menuList({ username: pushName }), contextInfo: {
            mentionedJid: [usersID],
            externalAdReply: {
              title: `𝙑𝙪𝙛𝙞 𝙗𝙤𝙩 𝙗𝙮 { 𝙙𝙚𝙛𝙖𝙫𝙤𝙡𝙞𝙖 }`,
              body: '𝘉𝘦𝘭𝘪 𝘧𝘪𝘵𝘶𝘳 𝘱𝘳𝘦𝘮𝘪𝘶𝘮 𝘣𝘰𝘵 𝘥𝘪𝘴𝘪𝘯𝘪',
              mediaType: 1,
              previewType: 0,
              renderLargerThumbnail: true,
              thumbnail: convertToUint8Array('./img/vufi.jpeg'),
              sourceUrl: 'https://instagram.com/defavolia',
              showAdAttribution: true
            }
          },
        }
      }, {})

    }

    const premiumMsg = async () => {

      await vufi.sendMessage(from, {
        text: `
𝘈𝘬𝘴𝘦𝘴 𝘧𝘪𝘵𝘶𝘳 𝘵𝘦𝘳𝘴𝘦𝘣𝘶𝘵 𝘩𝘢𝘯𝘺𝘢 𝘶𝘯𝘵𝘶𝘬 𝘗𝘳𝘦𝘮𝘪𝘶𝘮.
                  
𝘉𝘦𝘳𝘭𝘢𝘯𝘨𝘨𝘢𝘯𝘢𝘯 𝘧𝘪𝘵𝘶𝘳 𝘱𝘳𝘦𝘮𝘪𝘶𝘮 𝘥𝘪:
${ownerIg}
`
      }, {
        quoted: m
      })
    }

    // const sendLaugh = async () => {

    //   await vufi.sendMessage(from, {
    //     react: {
    //       text: "😂",
    //       key: msgId
    //     }
    //   })
    // }

    const sendWait = async () => {

      const vufi_chat = await vufi.sendMessage(from, {
        text: "_waittt..._"
      }, {
        quoted: m
      })

      return vufi_chat

    }

    const sendImgCap = async (img, caption) => {

      await vufi.sendMessage(from, {
        image: {
          url: img
        },
        caption: caption
      }, {
        quoted: m
      })
    }

    const sendVideoCap = async ({ video, caption }) => {

      await vufi.sendMessage(from, {
        video: {
          url: video
        },
        caption: caption || '-',
        jpegThumbnail: null,
      }, {
        quoted: m
      })
    }

    // cuman bisa pesat text / only text message
    const editMsg = async ({ response, new_msg }) => {

      const kiy = await response.key
      const keys = {
        remoteJid: kiy.remoteJid,
        fromMe: kiy.fromMe,
        id: kiy.id
      }

      await vufi.relayMessage(from, {
        protocolMessage: {
          key: keys,
          type: 14,
          editedMessage: {
            conversation: new_msg
          }
        }
      }, {})

    }


    const sendGroupInfo = async () => {
      if (!isGroup) return reply('Maaf anda sendang tidak di group');
      const groupInfo = await vufi.groupMetadata(from);
      const ppGroup = await vufi.profilePictureUrl(from, 'image')


      const groupParticipants = groupInfo.participants.map(member => `${member.id.replace(/@s.whatsapp.net/g, '')} => ${member.admin == null ? 'member' : member.admin}`)

      sendImgCap(ppGroup, `
${groupInfo.subject || '-'}

Owner: ${groupInfo.subjectOwner?.replace('@s.whatsapp.net', '') || groupInfo.owner?.replace('@s.whatsapp.net', '') || 'Tidak diketahui.'}
Desc: ${groupInfo.desc || '-'}
Members: ${groupInfo.size || '0'}

${groupParticipants.join('\n')}
`)



    }


    const calculateSeconds = (seconds) => {
      let hours = Math.floor(seconds / 3600);
      let remainingSeconds = seconds % 3600;
      let minutes = Math.floor(remainingSeconds / 60);
      let remainingSecondsFinal = remainingSeconds % 60;

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSecondsFinal.toString().padStart(2, '0')}`;
    }


    if (isBlock) return;

    // free commands
    switch (command) {

      case 'menu':
      case 'help':
      case 'command':
      case 'cmd':
      case 'perintah':
      case 'list':
        sendMenu()
        break;

      case 'ping':
      case 'p':
        await reply('pong')
        break;

      case 'hd':
        if (!m.message.imageMessage) {
          reply(
            `kirim gambar dengan caption ${prefix + command}`);
          return
        }
        sendWait()
        await hd(vufi, from, m)
        break;

      case 'lirik':
      case 'lyric':
      case 'lyrics':
        if (!q) {
          return reply(`kirim judul lagunya

ex: ${prefix + command} i love you 300`)
        };
        sendWait()

        try {
          const lirik = await searchLyrics({ query: q })
          reply(`
artist: ${lirik.artist || '-'}
title: ${lirik.title || '-'}

${lirik.lyrics.join('\n') || 'error'}
`)
        } catch (err) {
          see(err)
          reply('Lirik ga ketemu.')
        }


        break;

      case 'ffid':
      case 'freefireid':
      case 'cekff':
        if (!q) {
          reply(
            'kirim id free fire'
          );
          return
        }
        sendWait()

        caliph.search.freefireid(q).then((ff) => {
          see(ff)

          ff.status != 200 ? reply('user tidak ditemukan') :
            reply(`
*username:* ${ff.result}
`)
        })

        break;

      case 'transalte':
      case 'tr':
        if (!q) {
          reply(`
Kirim text dan kode bahasa

ex: ${prefix + command} i love you | id
`);
          return
        }

        const translateResult = q.split('|')
        const langCode = translateResult[1]?.trim() ?? 'id';

        sendWait()


        see(langCode)

        try {
          caliph.other.translate(translateResult[0], langCode).then((result) => {
            see(result)

            reply(`_dari bahasa: *${result.result.fromlang}*_
            
${result.result.text}
`)
          }).catch(() => reply('kode bahasa tidak tersedia'))
        } catch (err) {
          reply('somthing wrong')
        }

        break;
      case 'siapaaku':
      case 'aku?':
        try {
          const siapaAku = await caliph.game.siapakahaku()

          see(siapaAku)

          sendMsg(` 
${siapaAku.result.pertanyaan}

jawab dalam 15 detik
`)
          await delay(15000)

          sendMsg(`
jawaban: *${siapaAku.result.jawaban}*  
`)



        } catch (err) {
          reply('something wrong')
        }
        break;

      case 'bye':

        try {
          sendMsg('sampai jumpa semua👋😉')
          setTimeout(async () => {
            await vufi.groupLeave(from)
          }, 3000)
        } catch (err) {
          reply('something wrong')
        }

        break;

      case 'ytsearch':
      case 'yts':
        if (!q) {
          reply('kirim judul videonya');
          return;
        }
        sendWait()

        try {

          const ytsearch = await Nishino.download.youtube_play_mp3(q)
          sendImgCap(ytsearch.result.thumb, `
Title: *${ytsearch?.result?.title}*
Channel: *${ytsearch?.result?.channel}*
Published: *${ytsearch?.result?.published}*
Views: *${formatNum.format(ytsearch?.result?.views)}*
Category: *${ytsearch?.result?.category}*
Url: ${ytsearch?.result?.youtube_url}
`)

        } catch (err) {
          reply('404 ga ketemu')
        }
        break;

      //       case 'mlid': case 'mobilelegends': case 'mobelejen':
      //         if (!q) {
      //           reply(`kirim id mobile legends dan id servernya

      // ex: ${prefix + command} 109088431 | 2558
      // `);
      //           return;
      //         }
      //         sendWait()

      //         const mlid = q.split("|")

      //         try {
      //           const _ML = await hdiiofficial.game.nickNameMobileLegends(mlid[0], mlid[1])
      //           reply(`
      // *username:* ${_ML.userName}
      // `)
      //         } catch (error) {
      //           reply(`
      // user ga ketemu
      // `)
      //         }


      //         break;

      case 'ytaudio':
        if (!q) {
          reply('kirim judul videonya');
          return;
        }
        sendWait()

        Youtube.getInfo({ url: q }).then(video => {
          const audios = video.formats.find(data => data.mimeType.includes('audio/mp4'))
          console.log(audios.url);

          sendAudio(audios.url)
          // sendMsg(audios.url)


        }).catch(error => {
          sendMsg('Maaf ga ketemu')
        });


        break;

      case 'mp3':
        if (!q) {
          reply('kirim link audio');
          return;
        }
        sendWait()

        try {

          sendAudio(q)
          // sendMsg(audios.url)

        } catch (err) {
          reply('eror')
          see(err)
        }

        break;

      // case 'server':
      //   if (!q) {
      //     reply('kirim query start/restart/stop');
      //     return;
      //   }

      //   switch (q) {
      //     case 'start':

      //         const start_server = await start()
      //         reply(start_server)

      //       break;

      //     case 'stop':

      //         const stop_server = await stop()
      //         reply(`${stop_server}`)

      //       break;

      //     case 'reset':
      //     case 'restart':

      //       const restart_server = await reset()
      //         reply(`${restart_server}`)

      //       break;

      //     default:

      //       reply(`maaf query ${q} tidak ada, masukkan start/restart/stop`)

      //       break;
      //   }

      //   // const server_response 

      //   break;


    }


    // premium commands -=-=-=-=-=-=-=-=-=-=-
    switch (command) {

      case 's':
      case 'stiker':
      case 'sticker':
      case 'stic':
        if (!(isUserPremium || isGroupPremium || isOwner)) return premiumMsg();
        if (!(m.message.imageMessage)) return reply(`kirim gambar dengan caption ${prefix + command}`);


        // reply( m.message.documentMessage.caption)
        sendWait()
        await sticker(vufi, from, m)
        break;

      case 'all':
      case 'tagall':
      case 'everyone':
      case 'semua':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!from.includes('@g.us')) {
          reply('fitur ini hanya bisa digunakan di grup');
          return
        }
        await tagAll(vufi, from, pushName, isOwner, m);
        break;

      case 'ai':
      case 'chatgpt':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q) {
          reply(`kirim textnya
        
ex: ${prefix + command} apa itu orientasi`);
          return
        };
        const ai_response = await sendWait()
        try {

          const chatgpt = await ai(q)
          // reply(`\n${chatgpt}\n`)
          editMsg({ response: ai_response, new_msg: chatgpt })

        } catch (err) {

          reply('ada kesalahan')
        }

        break;

      //       case 'img':
      //       case 'imagine':
      //       case 'gambar':
      //       case 'dalle':
      //         if (!(isUserPremium || isGroupPremium || isOwner)) {
      //           premiumMsg();
      //           return
      //         };
      //         if (!q) {
      //           reply(`kirim textnya

      // ex: ${prefix + command} astronout`);
      //           return
      //         };
      //         sendWait()
      //         const dalle = await imagine(q)
      //         dalleResponse(q, dalle).catch((err) => {
      //           see(err)
      //           reply('ada kesalahan')
      //         })

      //         break;

      case 'reels':
      case 'igreels':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q) {
          reply(
            `kirim linknya
        
ex: ${prefix + command} https://www.instagram.com/reel/CqMxS53g_wX/?igshid=YmMyMTA2M2Y=`
          );
          return;
        }

        sendWait()

        try {
          const reelsIG = await axios.get(`${EXTRA_API}/reels?url=${q}`)

          vufi.sendMessage(from, {
            video: {
              url: reelsIG.data.video
            },
            caption: `
${reelsIG.data.details.title}
`,
            jpegThumbnail: null,
          }, {
            quoted: m
          })

        } catch (err) {
          see(err)
          reply('something wrong with you')
        }
        break;

      case 'img2url':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!m.message.imageMessage) {
          reply(`kirim gambar dengan caption ${prefix + command}`);
          return
        };
        sendWait()

        const BufferImage = await downloadMediaMessage(m, "buffer", {}, { logger })


        try {
          uploadByBuffer(BufferImage, 'image/jpeg')
            .then((result) => reply(result.link));

        } catch (err) {
          reply('something wrong')
        }

        break;

      case 'soundcloud':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q) {
          reply(`kirim judul lagu tambahkan juga nama penyanyi agar lebih spesifik 
          
ex: ${prefix + command} jvke - golden hour`);
          return
        };
        sendWait()

        try {

          const soundCloud_SEARCH = await caliph.search.soundcloud(q)
          const soundCloud_URL = soundCloud_SEARCH.result[0].url.replace('https://m.', 'https://')

          const soundCloud_music = await caliph.downloader.soundcloud(soundCloud_URL)

          const viaScLink = new URL(soundCloud_music.result.url)
          see(soundCloud_music)

          await sendImgCap(soundCloud_music.result.thumb, `
Title: *${soundCloud_music.result.title}*
Link download: ${viaScLink.href}

_Note: jika audio rusak salin link download dan gunakan fitur:_
_${prefix}viasc Link-download_
`).catch(err => reply('eror'))

          await vufi.sendMessage(from, { audio: { url: viaScLink.href }, mimetype: 'audio/mp4' }, { quoted: m }).catch((err) => reply(`error: ${err}`))

          // sendAudio(viaScLink)

        } catch (err) {
          reply('lagu ga ketemu')
        }
        break;

      case 'viasc':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q) {
          reply(`kirim link download di fitur
_${prefix}musik atau ${prefix}soundcloud_`);
          return
        };
        sendWait()

        try {

          await vufi.sendMessage(from, { audio: { url: q }, mimetype: 'audio/mp4' }, { quoted: m }).catch((err) => reply(`error: ${err}`))


        } catch (err) {
          reply('lagu ga ketemu')

        }
        break;

      case 'ytmusic':
      case 'ytm':
      case 'play':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q) {
          reply(`kirim judul lagunya`);
          return
        };
        sendWait()

        try {

          const ytmusic = await Nishino.download.youtube_play_mp3(q)

          const ytmusic_audio = await Nishino.download.youtube_dl_mp3(ytmusic?.result?.youtube_url)

          sendImgCap(ytmusic.result.thumb, `
Title: *${ytmusic?.result?.title}*
Channel: *${ytmusic?.result?.channel}*
Published: *${ytmusic?.result?.published}*
Views: *${formatNum.format(ytmusic?.result?.views)}*
Category: *${ytmusic?.result?.category}*
Url: ${ytmusic?.result?.youtube_url}
`)

          vufi.sendMessage(from, { audio: { url: ytmusic_audio?.result?.url }, mimetype: 'audio/mp4' }, { quoted: m }).catch((err) => {
            see(err)
            reply(`error: ${err}`)
          })

        } catch (err) {
          see(err)
          reply(`video ga ketemu`)
        }
        break;

      case 'ytmp3':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q) {
          reply(`kirim link youtube`);
          return
        };
        sendWait()

        try {

          const ytLink = await Nishino.download.youtube_dl_mp3(q)

          vufi.sendMessage(from, { audio: { url: ytLink?.result?.url }, mimetype: 'audio/mp4' }, { quoted: m }).catch((err) => {
            see(err)
            reply(`error: ${err}`)
          })

        } catch (err) {
          reply('something wrong')
        }
        break;

      case 'chord':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q) {
          reply(`kirim judul lagunya`);
          return
        };
        sendWait()

        caliph.search.chordlagu(q).then(async (chord) => {
          const chordTitle = '*' + chord.result.title + '*' || '-'
          const chordGuitar = '```' + chord.result.content + '```'
          reply('\n' + 'Title: ' + chordTitle + '\n\n\n' + chordGuitar + '\n')
        }).catch((err) => reply('lagu ga ketemu'))

        break;

      case 'hidetag':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };

        const replyTag = phoneNum?.replace(/@s.whatsapp.net/g, '')

        const textInfo = !q ? m.message?.extendedTextMessage?.contextInfo?.quotedMessage ? `@${replyTag}: ${replyMsg}` : q : q;


        let groupUser = await vufi.groupMetadata(from);
        var waJids = [];
        // textInfo = ''
        groupUser['participants'].map(
          async (uye) => {
            //     textInfo += '@' + uye.id.split('@')[0] + '\n';
            waJids.push(uye.id.replace('c.us', 's.whatsapp.net'))
          }
        )

        await vufi.sendMessage(from, {
          text: textInfo,
          mentions: waJids
        }, {
          quoted: {
            key: {
              id: 'inexistentId',
              remoteJid: '0@s.whatsapp.net',
              participant: '0@s.whatsapp.net',
            },
            message: {
              conversation: `hidetag from _*${isOwner ? pushName + '👑' : pushName + '🗿'}*_`
            }
          }
        })

        break;

      case 'ytvideo':
      case 'ytv':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q) {
          reply(`apa judul videonya`);
          return
        };
        sendWait()

        try {

          const ytVideo = await Nishino.download.youtube_play_mp3(q)

          Youtube.getInfo({ url: ytVideo?.result?.youtube_url }).then(async (video) => {
            const objResult = video
            // console.log(objResult);  

            const countsize = await axios.head(objResult.formats[0].url);
            const ytSize = countsize.headers['content-length'];

            if (ytSize && ytSize > 90 * 1024 * 1024) {
              reply('gabisa ngirim size diatas 90MB');
              return;
            }

            vufi.sendMessage(from, {
              video: {
                url: objResult.formats[0].url
              },
              caption: `
Title: *${objResult.videoDetails.title || '-'}*
Source: ${ytVideo?.result?.youtube_url}
Duration: *${calculateSeconds(Number(objResult.videoDetails.lengthSeconds)) || '-'}*
`
            }, {
              quoted: m
            }).catch((err) => reply(err))




          }).catch(error => {
            see(error)
          });

        } catch (err) {
          reply('404 ga ketemu')
        }



        break;


      case 'smeme':
        if (!(isUserPremium || isGroupPremium || isOwner)) return premiumMsg();
        if (q.includes('?')) return reply("jangan gunakan tanda tanya '?'");
        if (!(m.message.imageMessage)) {
          reply(`kirim gambar dengan caption ${prefix + command} topText | bottomText`);
          return;
        }

        sendWait();

        const smemePath = './smeme/smeme.webp'

        let smemeBuffer = await downloadMediaMessage(m, "buffer", {}, { logger });
        const smemeImgResize = await sharp(smemeBuffer).resize(2000, 2000).toBuffer();

        const smemeSplitText = q.split('|');

        const smemeImgUrl = await uploadByBuffer(smemeImgResize, 'image/jpeg')

        see(smemeImgUrl)

        async function smeme(topSmeme, bottomSmeme) {

          // Download image from URL
          const smemeResponse = await axios({
            url: `https://api.memegen.link/images/custom/${topSmeme || '_'}/${bottomSmeme || '_'}.png?background=${smemeImgUrl.link}`,
            method: 'GET',
            responseType: 'arraybuffer'
          });

          // Convert image to WebP
          const imageBuffer = Buffer.from(smemeResponse.data);
          sharp(imageBuffer).resize(2000, 2000)
            .toFormat('webp')
            .toFile(smemePath, async (err) => {
              if (err) {
                see(err);
              } else {
                see('File output.webp berhasil dibuat');
                await vufi.sendMessage(from, {
                  sticker: {
                    url: smemePath,
                  },
                  mimetype: 'image/webp',
                },
                  {
                    quoted: m
                  });
              }
            });

          // Do something with the WebP buffer
        }

        smeme(smemeSplitText[0], smemeSplitText[1]);

        break;

      case 'stalktt':
      case 'stalktiktok':
      case 'ttstalk':
      case 'stalktt':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q) {
          reply(`kirim username tiktok, gunakan huruf kecil!`);
          return
        };
        sendWait()

        try {

          const getTTUser = await axios.get(`https://ttapi.vufi.repl.co/tts?username=${q}`)
          const ttUser = getTTUser.data
          see(ttUser)

          sendImgCap(ttUser.userInfo.avatar, `
id: *${ttUser.userInfo.id}*
profile: tiktok.com/@${ttUser.userInfo.uniqueId}
username: *${ttUser.userInfo.uniqueId}*
nickname: *${ttUser.userInfo.nickname}*
followers: *${ttUser.userInfo.followers}*
following: *${ttUser.userInfo.following}*
videos: *${ttUser.userInfo.videos}*
likes: *${ttUser.userInfo.hearts}*
verified: *${ttUser.userInfo.verified ? 'Verified' : 'Not verified'}*
account status: *${ttUser.userInfo.privateAccount ? 'Public' : 'Private'}*
bio: ${ttUser.userInfo.signature}
`)

        } catch (err) {
          sendMsg(`user ${q} tidak ditemukan.`)
        }



        break;

      case 'pp':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          return premiumMsg();
        };

        const ppUserNumber = q ? q : m.message?.extendedTextMessage?.contextInfo?.participant ? m.message.extendedTextMessage.contextInfo.participant : ''

        if (!ppUserNumber) {
          reply(`kirim nomer, tag seseorang, atau reply chatnya`);
          return
        };

        const ppUserNumber2 = ppUserNumber.replace(/@/g, '')
          .replace(/@g.us/g, '')
          .replace(/s.whatsapp.net/g, '')
          .replace(/ /g, '')
          .replace('-', '')
          .replace('+', '')
        see(ppUserNumber2)


        if (!Number(ppUserNumber2)) return reply('nomer tidak valid.');

        try {

          const ppUrl = await vufi.profilePictureUrl(`${ppUserNumber2}@s.whatsapp.net`, 'image')
          sendImgCap(ppUrl)

        } catch (err) {
          reply(`Pp ngga ketemu, mungkin ga pasang atau privasi.`)
        }


        break;

      case 'pin':
      case 'pinterest':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q) {
          reply(`Apa yang ingin di cari di pinterest?`);
          return
        };
        sendWait()

        try {

          const pinterest = await axios.get(`${EXTRA_API}/pinterest?query=${q}`)

          sendImgCap(pinterest.data.image, q)
        } catch (err) {

          reply(`maaf ${q} ga ketemu.`)
        }

        break;


      case 'igstalk':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q) {
          reply(`kirim username instagram`);
          return
        };
        sendWait()

        try {


          const igstalk = await axios.get(`${EXTRA_API}/igstalk?username=${q}`)

          if (igstalk.data.error) {
            return reply(`maaf user *${q}* ga ketemu.`);
          }

          const bio_links = igstalk?.data?.bio_links.map(res => res.url).join('\n')

          sendImgCap(igstalk.data.profile_pic[1] ? igstalk.data.profile_pic[1].url : igstalk.data.profile_pic[0].url, `instagram.com/${igstalk.data.username}
          
username: *${igstalk.data.username}*        
name: ${'*' + igstalk.data.name + '*' || ''}
category: ${'*' + igstalk.data.category + '*' || ''}
visibility: ${igstalk.data.is_private ? '*Private*' : '*Public*'}
posts: *${igstalk.data.post}*
followers: *${igstalk.data.followers}*
following: *${igstalk.data.following}*
bio links: ${bio_links || '-'}
${'\n' + igstalk.data.biography + '\n' || ''}`).catch(err => reply(`maaf username ig *${q}* ga ketemu.`))

          // see(igstalk.data)


        } catch (err) {
          see(err)

          reply(`maaf ada kesalahan.`)
        }

        break;


      case 'igsg':
      case 'igstories':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q) {
          reply(`kirim username instagram`);
          return
        };
        sendWait()

        try {


          const getStories = await axios.get(`${EXTRA_API}/igstories?username=${q}`)

          const stories = getStories.data

          const count_video_igsg = stories?.filter(res => res.type == 'video').length
          const count_image_igsg = stories?.filter(res => res.type == 'image').length

          let stories_link = `${String(stories.length)} stories = ${String(count_image_igsg)} images ${count_video_igsg} videos
other stories will be here:\n\n `;

          await stories.map((item, index) => {
            if (index > 0) {
              return stories_link += `${item.type} ${String(index + 1)}\n${item.url}\n\n`;
            }

            if (item.type === 'image') {
              sendImgCap(item.url, `instagram.com/${q}`)
            } else {
              sendVideoCap({ video: item.url, caption: `${item.type} ${String(index + 1)} instagram.com/${q}` })
            }

          })

          reply(stories_link)


          //           const list_stories = getStories.data.map(key => `${key.type}\n${key.url}\n\n`)


          //           reply(`
          // ${stories.length} stories = ${count_video_igsg} video ${count_image_igsg} image

          // ${list_stories}`)


          see(stories)

        } catch (err) {
          see(err)

          reply(err.response.data.error)
        }

        break;




      case 'spotify':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q) {
          reply(`kirim judul lagu`);
          return
        };
        sendWait()

        try {

          const spotify = await axios.get(`${EXTRA_API}/spotify?song=${q}`)
          see(spotify.data)

          sendImgCap(spotify.data.details.thumbnail, `
artist: *${spotify.data.details.artist}*        
title: *${spotify.data.details.title}*
album: *${spotify.data.details.album}*
release: *${spotify.data.details.release_date}*
song id: *${spotify.data.details.id}*

preview track:
${spotify.data.details.preview_mp3}

_waittt for the audio..._
`).catch(err => reply(`maaf spotify *${q}* ga ketemu.`))

          sendAudio(spotify.data.track).catch(err => reply('audio not found.'))

        } catch (err) {

          reply(`maaf spotify *${q}* ga ketemu.`)
        }

        break;


      case 'simi':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q) {
          reply(`Apa yang ingin kamu tanyakan ke simi?`);
          return
        };

        try {

          const simiApi = await axios.get(`https://api.simsimi.net/v2/?text=${q}&lc=id`)
          see(simiApi.data)

          reply(simiApi.data.success)

        } catch (err) {

          reply(`maaf terjadi kesalahan.`)
        }

        break;

      case 'tt':
      case 'tiktok':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q || !q.includes('tiktok.com')) {
          reply(
            'kirim url video tiktok dan hapus preview linknya'
          );
          return
        }

        sendWait()

        try {

          const ttData = await axios.get(`${EXTRA_API}/tiktok?url=${q}`)

          vufi.sendMessage(from, {
            video: {
              url: ttData.data.video
            },
            caption: `
${ttData?.data.details.title}
`,
            jpegThumbnail: null,
          }, {
            quoted: m
          })

        } catch (err) {

          reply('something wrong')

        }

        break;

      case 'fb':
      case 'facebook':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q || !q.includes('facebook.com') && !q.includes('fb.watch')) {
          reply(
            'kirim url video facebook saja dan hapus preview linknya'
          );
          return
        }
        sendWait()

        try {

          const fbData = await axios.get(`${EXTRA_API}/fb?url=${q}`)

          vufi.sendMessage(from, {
            video: {
              url: fbData.data.video
            },
            jpegThumbnail: null,
          }, {
            quoted: m
          }).catch(err => reply('error ' + err))

        } catch (err) {

          reply('something wrong with you')
          sendError(err)

        }

        break;

      case 'ttaudio':
      case 'tiktokaudio':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q || !q.includes('tiktok.com')) {
          reply(
            'kirim url video tiktok'
          );
          return
        }

        sendWait()

        try {

          const ttDataAudio = await axios.get(`${EXTRA_API}/tiktok?url=${q}`)

          sendAudio(ttDataAudio.data.audio)

        } catch (err) {

          reply('something wrong')

        }

        break;


      case 'ai':
        if (!(isUserPremium || isGroupPremium || isOwner)) {
          premiumMsg();
          return
        };
        if (!q) {
          reply(
            'apa yang ingin kamu tanyakan?'
          );
          return
        }

        sendWait()

        try {

          const aiResponse = await ai(q)

          sendMsg(aiResponse)

        } catch (err) {

          reply('something wrong')

        }

        break;

    }


    // admin menu
    switch (command) {

      case 'infogrup':
      case 'infogroup':
      case 'groupinfo':
      case 'infogc':

        sendGroupInfo()

        break;
    }


    // owner commands
    switch (command) {

      case 'block':
      case 'blok':
      case 'blokir':
        if (!(isOwner)) {
          return
        };
        await addUser(vufi, from, q, m, phoneNum, blockPath,
          'block').then(async () => {
            await vufi.updateBlockStatus(phoneNum, "block");
          })
        break;

      case 'unblock':
      case 'unblok':
      case 'unblokir':
        if (!(isOwner)) return;
        await removeUser(vufi, from, q, m, phoneNum, blockPath,
          'unblock').then(async () => {
            await vufi.updateBlockStatus(phoneNum, "unblock")
          })
        break;

      case 'addprem':
      case 'prem':
      case 'premium':
        if (!(isOwner)) return;
        await addUser(vufi, from, q, m, phoneNum,
          premiumUsersPath, 'menambahkan premium user').then(
            async () => {
              await vufi.updateBlockStatus(phoneNum,
                "menambahkan premium user")
            })
        break;

      case 'noprem':
      case 'unprem':
      case 'removepremium':
        if (!(isOwner)) return;
        await removeUser(vufi, from, q, m, phoneNum,
          premiumUsersPath, 'menghapus premium user').then(
            async () => {
              await vufi.updateBlockStatus(phoneNum,
                "menghapus ")
            })
        break;

      case 'listblock':
        if (!(isOwner)) return;
        see(usersBlock)
        let listBlocked = usersBlock?.join('\n').replace(
          /@s.whatsapp.net/g, '')
        await reply(`Daftar nomer yang di blokir bot:
                    
${!usersBlock || listBlocked == '' ? '- kosong -' : listBlocked}`)
        see(listBlocked)
        break;

      case 'listprem':
        if (!(isOwner)) return;
        see(usersPremium)
        let listPremiums = usersPremium?.join('\n').replace(
          /@s.whatsapp.net/g, '')
        await reply(
          `Daftar nomer yang telah *Premium*:
                    
${!usersPremium || listPremiums == '' ? '- kosong -' : listPremiums}`
        )
        see(listPremiums)
        break;

      case 'listgrup':
        if (!(isOwner)) return;
        see(groupsPremium)
        let listGroupsPremium = groupsPremium?.join('\n')
        await reply(
          `Daftar grup yang telah *Premium*:
                    
${!groupsPremium || listGroupsPremium == '' ? '- kosong -' : listGroupsPremium}`
        )
        see(listGroupsPremium)
        break;

      case 'grupid':
      case 'id':
        if (!(isOwner)) return;
        await reply(from)
        break;

      case 'acc':
      case 'join':
        if (!(isOwner)) return;
        if (!q) {
          reply('kirim kode grupnya di link invite');
          return;
        }
        try {
          await vufi.groupAcceptInviteV4(from, q)
          reply('berhasil join')
        } catch (err) {
          reply('kode tidak valid')
        }
        break;

      case 'eval':
        if (!(isOwner)) return;
        if (!q) return reply('kirim kode javascript');

        try {

          const evaluated = await safeEval(q)
          see(evaluated)
          reply(String(evaluated))

        } catch (err) {
          see(err)
          reply(err.toString())
        }

        break;

      case 'exec':
        if (!(isOwner)) return;
        if (!q) return reply('kirim kode execute');

        const exec_response = await sendWait()

        const exec_result = await exec(q)

        editMsg({ response: exec_response, new_msg: exec_result })

        break;

      // case 'link':
      //   if (!(isOwner)) return;

      //  // await vufi.sendMessage()
      //   const Link = async () => {

      //     vufi.sendMessage(from, {
      //       forward: {
      //         key: { fromMe: isMe },
      //         message: {
      //           extendedTextMessage: {
      //             text: "https://www.instagram.com/defavolia/",
      //             matchedText: 'https://www.instagram.com/defavolia/',
      //             canonicalUrl: 'wa.me/settings',
      //             renderLargerUrl: true,
      //             title: " ",
      //             description: 'Lahhh',
      //             jpegThumbnail: fs.readFileSync('./img/atom.png'),
      //             // previewType: 0
      //           }
      //         }
      //       }
      //     })

      //   }

      //   Link()
      //   break;

      case 'fake':
        if (!(isOwner)) return;

        vufi.relayMessage(from, {
          extendedTextMessage: {
            text: 'https://instagram.com/defavolia',
            matchedText: 'https://instagram.com/defavolia',
            description: 'Undangan Grup WhatsApp',
            title: 'FANTASTIC BOT',
            previewType: 0,
            doNotPlayInline: false,
            font: 6,
            jpegThumbnail: convertToUint8Array('./img/vufi.jpeg'),
            thumbnailHeight: 640,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: 0,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 499
            }
          }
        }, {})



        break;

      case 'ev':
        if (!(isOwner)) return;
        if (!q) return reply('kirim kode javascript');

        try {
          let evaled = await eval(q)
          if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
          reply(`» ${evaled}`)
        } catch (err) {
          console.error(err)
          reply(`» Error: ${err.message}`)
        }

        break;

      case 'poll':
        if (!(isOwner)) return;


        vufi.sendMessage(from, {
          poll: {
            name: "test",
            values: [
              "tessssss1",
              "tessssss2"
            ]
          }
        })


        break;


    }

  } catch (err) {
    see(err)
  }

}

module.exports = {
  msgHandler
}