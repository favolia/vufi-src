const fs = require('fs')
const see = console.log

const convertToUint8Array = (filePath) => {
  try {
    const fileData = fs.readFileSync(filePath);
    const uint8Array = new Uint8Array(fileData);
    
    // Lakukan sesuatu dengan Uint8Array hasil konversi
    return uint8Array
  } catch (error) {
    // console.error('Error:', error);
    return err
  }
}


module.exports = {
  convertToUint8Array
}
