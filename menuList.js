const igOwner = `instagram.com/defavolia` 

const menuList = ({ username = "-" }) => {
  return `
┏━━⬣ 𝙄𝙉𝙁𝙊
┃⬡ Nama User : 「 ${username} 」
┃⬡ Nama Bot : 「 Vufi 」
┃⬡ Prefix : 「 Multi 」
┗━━⬣

┏━━「 Main Menu 」
┃⬡ .ping
┗━━⬣

┏━━「 Fun Menu 」
┃⬡ .siapaAku
┃⬡ .simi
┃⬡ .ai
┗━━⬣

┏━━「 Converter Menu 」
┃⬡ .stiker
┃⬡ .img2url
┃⬡ .smeme
┃⬡ .hd
┗━━⬣

┏━━「 Downloader Menu 」
┃⬡ .fb
┃⬡ .tiktok
┃⬡ .tiktokaudio
┃⬡ ~.ytmp3~ 
┃⬡ ~.ytaudio~
┃⬡ .reels
┗━━⬣

┏━━「 SPAM Menu 」
┃⬡ .tagall
┃⬡ .hidetag
┗━━⬣

┏━━「 STALK Menu 」
┃⬡ .igstalk
┃⬡ .igstories
┗━━⬣

┏━━「 Search Menu 」
┃⬡ ~.ytsearch~
┃⬡ ~.ytvideo~
┃⬡ .chord
┃⬡ .ffid
┃⬡ .mlid
┃⬡ ~.play~
┃⬡ .translate
┃⬡ .ttstalk
┃⬡ .igstak
┃⬡ .soundcloud
┃⬡ .spotify
┃⬡ .pinterest
┃⬡ .lirik
┃⬡ .pp
┗━━⬣

=---------------------------=

┏━━「 Admin Menu 」
┃⬡ .infogrup
┗━━⬣
`
}

// const menuAdmin = async () => {
//   return ``
// }


module.exports= {
  menuList
}