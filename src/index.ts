import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import msg from "./messages2";
import mime from "mime-types";
import fs from "fs";
import { convertAudio } from "./converAudio";
import transcribeAudio from "./audioai";

console.log("initializing application");
async function init() {
  const initMsg = `Client is ready! ${new Date()}`;

  const client = new Client({
    authStrategy: new LocalAuth({ clientId: "t", dataPath: "session" }),
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
    // console.log(message);

    await msg(message)
  });


  client.initialize();
}
init();
