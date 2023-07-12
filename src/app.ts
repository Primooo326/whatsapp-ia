import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import msg from "./messages2";
import fs from "fs";

console.log("initializing application");
async function init() {
  const initMsg = `Client is ready! ${new Date()}`;

  const client = new Client({
    authStrategy: new LocalAuth({ clientId: "t", dataPath: "session" }),
    puppeteer: {
      args: ['--no-sandbox'],
    }
  });

  client.on("qr", (qr) => {
    console.log("escanea el qr");

    qrcode.generate(qr, { small: true });
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


  client.initialize();
}
try {
  
  init();
} catch (error) {
  console.log(error);
  init();
}
