const see = console.log;
const axios = require('axios')

const azharim = 'https://song-lyrics-api.azharimm.dev'

// const cari = `shawn mendes imagination`;

const _lyrics = async ({ _data }) => {
  const { data, status } = await axios.get(_data.songLyrics);

  const format = {
    artist: data.data.artist || '-',
    title: data.data.songTitle || '-',
    lyrics: data.data.songLyricsArr || '-'
  }

  return format;
}

const searchLyrics = async ({ query }) => {

  const { data, status } = await axios.get(`${azharim}/search?q=${query}`);

  if(!data.data.length > 0) throw new Error('Lyrics not found.')
  
  const lyrics = await _lyrics({ _data: data.data[0] })
  // see(lyric)
  return lyrics;
    
  }
  

module.exports = {
  searchLyrics
}