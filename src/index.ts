import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import msg from "./messages";
import fs from "fs";
import mime from "mime-types";

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

    // !descarga tods los contactos a un archivo excel
    // let clients: any[] = [];

    // (await client.getChats()).forEach((chat) => {
    // 	clients.push({ number: chat.id.user, name: chat.name });
    // });

    // xlsxfun(clients);
    // const file = "rome.json";
    // const media = MessageMedia.fromFilePath(file);

    // client.sendMessage(numberId!._serialized, media);
    await client.sendMessage(numberId!._serialized, initMsg);
  });

  client.on("message", async (message) => {
    console.log(message);
    await msg(message.body, message.from, client).then(async (resp: any) => {
      if (resp) await message.reply(resp.content);
    });
  });

  client.initialize();
}
init();
