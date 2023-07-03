const see = console.log


const tagAll =  async (vufi, from, pushName, isOwner, m) => {


      const fakeReply = {
      key: {
        id: 'inexistentId',
        remoteJid: '0@s.whatsapp.net',
        participant: '0@s.whatsapp.net',
      },
      message: {
        conversation: `tagall from _*${isOwner ? pushName + '👑' : pushName + '🗿'}*_`
      }
    }

  
  
              let grup = await vufi.groupMetadata(from);
              var jids = [];
              mesaj = ''
              grup['participants'].map(
                async (uye) => {
                  mesaj += '@' + uye.id.split('@')[0] + '\n';
                  jids.push(uye.id.replace('c.us', 's.whatsapp.net'))
                }
              )

              await vufi.sendMessage(from, {
                text: `
${mesaj}`,
                mentions: jids
              }, {
                quoted: fakeReply
              })
                
}


module.exports = {
  tagAll
}