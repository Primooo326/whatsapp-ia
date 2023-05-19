import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import msg from "./messages";
import fs from "fs";
import path from "path";
import ffmpeg from 'fluent-ffmpeg';
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
		console.log(numberId);
		try {
			await client.sendMessage("573196458411@c.us", initMsg);
		} catch (error) {
			console.log(error);
		}
	});

	client.on("message", async (message) => {
		console.log(message);

		const chat = client.getChatById("120363149341692638@g.us");
		//!Get fechanpm run start

		//!Audio
		try {
			if (message.hasMedia && message.type === "audio") {
				message
					.downloadMedia()
					.then((audioData) => {
						console.log(audioData);
						const folderPath = "Audios";
						const filename = message.id.id
						audioData.filename = filename
						const filePath = path.join(folderPath, audioData.filename + ".ogg");

						// Crear la carpeta si no existe
						if (!fs.existsSync(folderPath)) {
							fs.mkdirSync(folderPath);
						}

						// Guardar el archivo de audio
						fs.writeFile(filePath, audioData.data, "base64", (error) => {
							if (error) {
								console.error("Error al guardar el audio:", error);
							} else {
								console.log("Audio guardado:", filePath);
							}
						});
						var outStream = fs.createWriteStream('./Audios/'+filename+'.mp3');

						ffmpeg()
						  .input('./Audios/'+ filename)
						  .audioQuality(96)
						  .toFormat("mp3")
						  .on('error', error => console.log(`Encoding Error: ${error.message}`))
						  .on('exit', () => console.log('Audio recorder exited'))
						  .on('close', () => console.log('Audio recorder closed'))
						  .on('end', (data) => console.log('Audio Transcoding succeeded !'))
						  .pipe(outStream, { end: true });
					})
					.catch((err) => {
						console.log("err::", err);
					});
			}
		} catch (error) {
			console.log(error);
		}
		//!Ai
		await msg(message).then(async (resp: any) => {
			if (resp) await message.reply(resp.content);
		});
	});

	client.initialize();
}
init();
