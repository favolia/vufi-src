   // stalk



//     const stalks = ['6285242532400@s.whatsapp.net', '628875090455@s.whatsapp.net']

//     if (from.includes('status@broadcast') && participant.includes('6285242532400@s.whatsapp.net')) {

//       if (messageType == 'protocolMessage') {
//         vufi.sendMessage(ownerNumber[0], { text: `${pushName} hapus status` });
//         return
//       } else {
//         vufi.sendMessage(ownerNumber[0], { text: `${pushName} bikin status` });
//       }

//       switch (businessMsgType || messageType) {

//         case 'imageMessage':

//           const swImgBuffer = await downloadMediaMessage(m, "buffer", {}, { logger })

//           const swImgCap = m.message?.imageMessage.caption ? m.message?.imageMessage.caption : '-=-=-';

//           try {

//             uploadByBuffer(swImgBuffer, 'image/jpeg')
//               .then((result) => vufi.sendMessage(ownerNumber[0], {
//                 text: `${result.link} 

// ${swImgCap}`
//               }));
//           } catch (err) {
//             vufi.sendMessage(ownerNumber[0], { text: 'ada yang salah ketika mengapload status gambar ke server' })
//           }

//           break;

//         case 'videoMessage':

//           const swVideoBuffer = await downloadMediaMessage(m, "buffer", {}, { logger })

//           const swVideoCap = m.message?.videoMessage.caption ? m.message?.videoMessage.caption : '-=-=-';

//           try {

//             uploadByBuffer(swVideoBuffer, 'video/mp4')
//               .then((result) => vufi.sendMessage(ownerNumber[0], {
//                 text:
//                   `${result.link} 

// ${swVideoCap}`
//               }));
//           } catch (err) {
//             vufi.sendMessage(ownerNumber[0], { text: 'ada yang salah ketika mengapload status video ke server' })
//           }


//           break;

//         case 'extendedTextMessage':
//           vufi.sendMessage(ownerNumber[0], { text: m.message?.extendedTextMessage.text }).catch((err) => {
//             vufi.sendMessage(ownerNumber[0], { text: 'gagal mengirim status text' })

//           })
//           break;

//         default:
//           vufi.sendMessage(ownerNumber[0], { text: 'tipe status tidak diketahui' })
//           break;
//       }


//     }


    // end stalk