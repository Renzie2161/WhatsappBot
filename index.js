const { Client, Location, MessageMedia } = require('whatsapp-web.js');
const { prefix } = require("./config.json");
const imageToBase64 = require('image-to-base64');
const qrcode = require('qrcode-terminal');
const moment = require('moment');
const fs = require('fs')
const cheerio = require("cheerio");
const urlencode = require("urlencode");
const exec = require("child_process").exec;
const infocovid = require("./lib/infocovid.js");
const ytdl = require("ytdl-core");
const figlet = require('figlet');
const axios = require('axios');
const ytSearch = require("yt-search")
const get = require('got');
const buffer = require("buffer");
const ffmpeg = require('ffmpeg')
const fetch = require('node-fetch');

var jam = moment().format("HH:mm");

const SESSION_FILE_PATH = './session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({ puppeteer: { headless: true }, session: sessionCfg });
// You can use an existing session and avoid scanning a QR code by adding a "session" object to the client options.
// This object must include WABrowserId, WASecretBundle, WAToken1 and WAToken2.

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('\x1b[1m', 'QR : ', qr);
    console.log('\x1b[1m')
    qrcode.generate(qr,
        {
           small: true
        });

});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {

console.log('\x1b[34m', '----------------') // BLUE
console.log('\x1b[32m', 'DevERS Bot') // GREEN
console.log('\x1b[34m', '----------------') // BLUE
console.log('\x1b[31m', '[DEV]', 'DevERS') // RED
console.log('\x1b[33m', '[Verified] Developer Verified !') //YELLOW
console.log('')
console.log('\x1b[32m', 'DevERS Bot Activated !') // GREEN
console.log('\x1b[31m')

    const status_text = [
        "This Account Controlled by Script !",
        "This Account Bot",
        "Iyey Gais Im Bot",
        "Beep Boop Beep Boop Calon Mantu :v",
        "Created by DevERS",
        "Subscribe RM81 2!",
        "I Lope u"
      ]; //BISA DIUBAH SEMAU MUNGKIN DAN SEBANYAK MUNGKIN
    
      const emojis = ["🧡", "💞", "👨", "🎇"];
      //JIKA TIDAK MAU PAKE EMOJI JUGA GAK PAPA
    
      const index = Math.floor(Math.random() * (status_text.length - 1) + 1);
      const index2 = Math.floor(Math.random() * (emojis.length - 1) + 1);
      //YANG BIKIN RANDOM!
    
      client.setStatus(`This Account Has Been Controled By Script.`);
    
      setInterval(() => {
        const index = Math.floor(Math.random() * (status_text.length - 1) + 1);
        const index2 = Math.floor(Math.random() * (emojis.length - 1) + 1);
    
        client.setStatus(
          `${emojis[index2]} ${status_text[index]} ${emojis[index2]}`
        ); //EMOJI STATUS_TEXT EMOJI
      }, 10000);

});

client.on("message", async msg => {
    let chat = await msg.getChat();
    const text = msg.body

if (msg.body == `${prefix}ping`){
    msg.reply("Pong")
    console.log('\x1b[35m', '[Dev Logs]', 'Ping Command')
    console.log('\x1b[47m')
}else if (msg.body == `${prefix}foto vicious`) {
    const media = MessageMedia.fromFilePath('vicious.png');
    chat.sendMessage(media, {caption: "Ini Gan."})
    console.log('\x1b[35m', '[Dev Logs]', 'foto Vicious Command')
    console.log('\x1b[47m')
}else if (msg.body === prefix+"sticker vicious") {
    const media = MessageMedia.fromFilePath("vicious.png")
    client.sendMessage(msg.from, media, { sendMediaAsSticker: true})
    console.log('\x1b[35m', '[Dev Logs]', 'Sticker Vicious Command')
    console.log('\x1b[47m')
}else if (msg.body == `${prefix}menu`){
    console.log('\x1b[35m', '[Dev Logs]', 'Help Command')
    console.log('\x1b[47m')
    msg.reply('*DevERS Bot Menu*\n\n\nAdmin Commands : \n\n\nInformation Commands : \n-help,-menu\n\n\nTesting Commands : \n-ping,-sticker vicious,$foto vicious\n\n\nMusic Commands : \n-lyric <song name>\n\n\nFun Commands : \n-anime,-quotes,-gcpet *(Gacha Pet)*\n\n\n---------------------\n\n\nDevERS Bot')
}else if (msg.body === prefix+'covidinfo'){
    const corohelp = await get.get('https://covid19.mathdro.id/api/countries/id').json()
    var date = new Date();
    var tahun = date.getFullYear();
    var bulan = date.getMonth();
    var tanggal = date.getDate();
    var hari = date.getDay();
    var jam = date.getHours();
    var menit = date.getMinutes();
    var detik = date.getSeconds();
    switch(hari) {
     case 0: hari = "Minggu"; break;
     case 1: hari = "Senin"; break;
     case 2: hari = "Selasa"; break;
     case 3: hari = "Rabu"; break;
     case 4: hari = "Kamis"; break;
     case 5: hari = "Jum'at"; break;
     case 6: hari = "Sabtu"; break;
    }
    switch(bulan) {
     case 0: bulan = "Januari"; break;
     case 1: bulan = "Februari"; break;
     case 2: bulan = "Maret"; break;
     case 3: bulan = "April"; break;
     case 4: bulan = "Mei"; break;
     case 5: bulan = "Juni"; break;
     case 6: bulan = "Juli"; break;
     case 7: bulan = "Agustus"; break;
     case 8: bulan = "September"; break;
     case 9: bulan = "Oktober"; break;
     case 10: bulan = "November"; break;
     case 11: bulan = "Desember"; break;
    }
    var tampilTanggal = "TANGGAL: " + hari + ", " + tanggal + " " + bulan + " " + tahun;
    var tampilWaktu = "JAM: " + jam + ":" + menit + ":" + detik;
    msg.reply(infocovid.infocovid(corohelp, tampilTanggal, tampilWaktu))
    console.log('\x1b[35m', '[Dev Logs]', 'CovidInfo Command')
    console.log('\x1b[47m')
    }else if (msg.body === prefix+'nulis')
    {
       const
       {
          spawn
       } = require("child_process");
       console.log("writing...")
       const teks = text.replace(/-nulis /, "")
       const split = teks.replace(/(\S+\s*){1,10}/g, "$&\n")
       const fixedHeight = split.split("\n").slice(0, 80).join("\n")
       console.log(split)
       spawn("convert", [
             "./assets/paper.jpg",
             "-font",
             "Indie-Flower",
             "-size",
             "700x960",
             "-pointsize",
             "30",
             "-interline-spacing",
             "5",
             "-annotate",
             "+170+222",
             fixedHeight,
             "./assets/result.jpg"
          ])
          .on("error", () => console.log("error"))
          .on("exit", () =>
          {
             const buffer = fs.readFileSync("assets/result.jpg")
             chat.sendMessage(buffer, { caption: "Ini Gan."})
             console.log("done")
             console.log('\x1b[35m', '[Dev Logs]', 'Nulis Command')
             console.log('\x1b[47m')
          })
       }else if (msg.body === prefix+'quotes')
       {
          var url = 'https://jagokata.com/kata-bijak/acak.html'
          axios.get(url)
             .then((result) =>
             {
                let $ = cheerio.load(result.data);
                var author = $('a[class="auteurfbnaam"]').contents().first().text();
                var kata = $('q[class="fbquote"]').contents().first().text();

                console.log('\x1b[35m', '[Dev Logs]', 'Quotes Command')
                console.log('\x1b[47m')

                msg.reply(
                   `
         _${kata}_
            
        
       *~${author}*
             `
                );
             });
       }else if (text.includes(prefix+'lyric')){
          const teks = text.split("-lyric")[1]
             axios.get(`http://scrap.terhambar.com/lirik?word=${teks}`).then ((res) => {
                    let hasil = `Song Lyrics: *${teks}* \n\n ${res.data.result.lirik}`
                msg.reply(hasil)
                console.log('\x1b[35m', '[Dev Logs]', 'Lyrics Command')
                console.log('\x1b[47m')
       })
    }else if (text.includes(prefix+'gcpet')){
        const teks = text.replace(/./, '')
        const pet =[
            'Anjing',
            'Kucing',
            'Babi',
            'Monyet',
            'Kura Kura',
            'Gajah',
            'Ayam',
            'Hamster',
            'Beruang',
            'Domba',
            'Serigala',
            'Kambeng',
            'Sapi',
            'Penguin',
            'Burung Puyuh']
        const petrandom = pet[Math.floor(Math.random() * pet.length)]
        msg.reply('After Gacha 1 Times You Get : ', petrandom)
    }

    /* if (msg.body == `${prefix}ping`) {
        msg.reply("Pong")
    } else if (msg.body == "file") {
        const { MessageMedia } = require('whatsapp-web.js');

const media = MessageMedia.fromFilePath('file-yang-akan-dikirim.txt');
chat.sendMessage(media, { caption: "Ini gan."})
    } */
})
client.initialize();