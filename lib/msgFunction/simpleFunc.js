const fs = require('fs')
const see = console.log

// const path = './database/usersBlock.json'
const callBlockPath = './database/usersBlock.json'

function addToPath(user, path) {
    // Membaca data dari file
    fs.readFile(path, {
        encoding: 'utf8'
    }, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Jika file tidak ditemukan, maka data diinisialisasi dengan array kosong
                data = '[]';
            } else {
                console.error(err);
                return;
            }
        }

        // Mengubah data menjadi array
        let dataArray = JSON.parse(data);

        // Menambahkan nilai baru ke dalam array
        dataArray.push(user);

        // Mengonversi data array menjadi JSON
        let dataJSON = JSON.stringify(dataArray);

        // Menulis kembali data array yang sudah diupdate ke dalam file
        fs.writeFile(path, dataJSON, {
            flag: 'w+'
        }, (err) => {
            if (err) throw err;
            console.log('Data berhasil ditambahkan ke dalam file!');
        });
    });
}

function removingFromPath(user, path) {
    // Membaca data dari file
    fs.readFile(path, {
        encoding: 'utf8'
    }, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // Mengubah data menjadi array
        let dataArray = JSON.parse(data);

        // Menghapus nilai yang dimiliki yang sama dengan salah satu isi arraynya
        dataArray = dataArray.filter((data) => data !== user);

        // Mengonversi data array menjadi JSON
        let dataJSON = JSON.stringify(dataArray);

        // Menulis kembali data array yang sudah diupdate ke dalam file
        fs.writeFile(path, dataJSON, {
            flag: 'w+'
        }, (err) => {
            if (err) throw err;
            console.log('Data berhasil dihapus dari file!');
        });
    });
}


async function addUser(vufi, from, q, m, phoneNum, path, reason) {

    async function reply(text) {
       await vufi.sendMessage(from, {
            text: text
        }, {
            quoted: m
        })
    }


    if (!phoneNum) {
        reply('nomernya mana')
        return;
    }

  const num = phoneNum.replace(/[^0-9]/g, "")

    if (Number(num)) {
        if (num.length >= 12 && num.length <= 14) {
            
            await addToPath(phoneNum, path)
            reply(`berhasil ${reason}`);
            return;
        }
        reply('nomer tidak valid')
    } else {
        reply(`kirim nomer yang bener eeq`)
    }

}

async function removeUser(vufi, from, phoneNum, m, phoneNum, path, reason) {

    async function reply(text) {
       await vufi.sendMessage(from, {
            text: text
        }, {
            quoted: m
        })
    }


    if (!phoneNum) {
        reply('nomernya mana')
        return;
    }

  const num = phoneNum.replace(/[^0-9]/g, "")

    if (Number(num)) {
        if (num.length >= 12 && num.length <= 14) {
            removingFromPath(phoneNum, path)
            reply(`berhasil ${reason}`);
            return;
        }
        reply('nomer tidak valid')
    } else {
        reply(`kirim nomer yang bener eeq`)
    }


}


function callBlock(user) {
    // Membaca data dari file
    fs.readFile(callBlockPath, {
        encoding: 'utf8'
    }, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Jika file tidak ditemukan, maka data diinisialisasi dengan array kosong
                data = '[]';
            } else {
                console.error(err);
                return;
            }
        }

        // Mengubah data menjadi array
        let dataArray = JSON.parse(data);

        // Menambahkan nilai baru ke dalam array
        dataArray.push(user);

        // Mengonversi data array menjadi JSON
        let dataJSON = JSON.stringify(dataArray);

        // Menulis kembali data array yang sudah diupdate ke dalam file
        fs.writeFile(callBlockPath, dataJSON, {
            flag: 'w+'
        }, (err) => {
            if (err) throw err;
            console.log('Data berhasil ditambahkan ke dalam file!');
        });
    });
}






module.exports = {
    addUser,
    removeUser,
    callBlock
}