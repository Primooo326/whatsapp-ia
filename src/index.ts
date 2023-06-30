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
    // console.log(message);

    await msg(message)
  });


  // client.on("message", async (message) => {
  //   console.log(message);

  //   if (
  //     (message.hasMedia && message.type === "audio") ||
  //     message.type === "ptt"
  //   ) {
  //     try {
  //       // await message.reply("transcribiendo audio...");
  //   await client.sendMessage(message.from, "transcribiendo audio...")
  //       console.log("downloading audio");
  //       const mediaData = await message.downloadMedia();
  //       const filePath = `./Audios/${Date.now()}.ogg`;

  //       // Guardar el archivo de audio en el directorio especificado
  //       fs.writeFileSync(filePath, mediaData.data, "base64");
  //       const audioConverted = await convertAudio(filePath);
  //       console.log("Audio descargado con éxito:", audioConverted);

  //       await transcribeAudio(audioConverted)
  //         .then(async (transcription) => {
  //           // await message.reply("Transcripción del audio:", transcription);
  //           await client.sendMessage(message.from, transcription);
  //           console.log("Transcripción del audio:::", transcription);
  //           await msg(transcription, message.from, true)
  //             .then(async (resp: any) => {
  //               if (resp) await message.reply(resp.content);
  //             })
  //             .catch((err) => console.log(err));
  //         })
  //         .catch((error) => {
  //           console.error("Error:", error);
  //         });
  //     } catch (error) {
  //       console.log("error:", error);
  //     }
  //   }

  //   await msg(message.body, message.from).then(async (resp: any) => {
  //     if (resp) await message.reply(resp.content);
  //   });
  // });

  client.initialize();
}
init();
