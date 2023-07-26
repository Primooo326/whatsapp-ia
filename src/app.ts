import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import msg from "./messages2";
import fs from "fs";
const fetch = require('node-fetch');
const { createCanvas, loadImage } = require('canvas');
import loggerFunction from "./logger"
console.log("initializing application");
async function init() {
  const initMsg = `Client is ready! ${new Date()}`;

  //init logger

  setInterval(()=>{
   loggerFunction("codeando ando xd")
},1000)

  const client = new Client({
    authStrategy: new LocalAuth({ clientId: "t", dataPath: "session" }),
    puppeteer: {
      args: ['--no-sandbox'],
    }
  });

  client.on("qr", async (qr) => {
    console.log("escanea el qr");
    const codeHttp = "https://chart.googleapis.com/chart?cht=qr&chs=177x177&choe=utf-8&chl="+qr

    console.log(codeHttp);
    fetchQRCodeAndShow();
    qrcode.generate(qr, { small: true });
    return new Response(codeHttp)
  });

  client.on("ready", async () => {
    console.log(initMsg);



    const numberId = await client.getNumberId("573196458411");

    if (!fs.existsSync("Audios")) {
      fs.mkdirSync("Audios");
    }


    await client.sendMessage(numberId!._serialized, initMsg);
  });

  client.on("message", async (message) => {
    await msg(message)
  });

  client.on("disconnected", async () => {
    console.log("disconnected");
   init();
  })


  client.initialize();
}
try {
  
  init();
} catch (error) {
  console.log(error);
  init();
}


function fetchQRCodeAndShow() {
  const url = 'https://chart.googleapis.com/chart?cht=qr&chs=177x177&choe=utf-8&chl=holamundo';

  // Hacemos la petición utilizando node-fetch
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.buffer();
    })
    .then(imageBuffer => {
      // Creamos el lienzo (canvas) y la imagen a partir del buffer recibido
      const canvas = createCanvas(177, 177);
      const context = canvas.getContext('2d');

      loadImage(imageBuffer).then(image => {
        // Dibujamos la imagen en el lienzo
        context.drawImage(image, 0, 0, 177, 177);

        // Creamos una ventana gráfica para mostrar el código QR
        const { registerFont } = require('canvas');
        registerFont('./path/to/your-font-file.ttf', { family: 'YourFontName' }); // Reemplaza con una fuente compatible

        const window = require('window');
        const win = new window.Window();

        // Mostramos el lienzo en la ventana gráfica
        win.document.body.appendChild(canvas);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}