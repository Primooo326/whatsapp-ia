import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";


async function init (){

const initMsg = `Client is ready! ${new Date()}`;

console.log(initMsg);
// const client = new Client({
// 	authStrategy: new LocalAuth({ clientId: "t", dataPath: "session" }),
// });

// client.on("qr", (qr) => {
// 	console.log("escanea el qr");
// 	qrcode.generate(qr, { small: true });
// });

// client.on("ready", async () => {
// console.log(initMsg);

// 	const numberId = await client.getNumberId("573196458411");
// 	await client.sendMessage(numberId!._serialized, initMsg);

// });

//     client.on("message", async (message) => {
//     console.log(message);
// 	// await msgFn(message.body, message.from).then(async (resp:any)=>{
// 	// 	if (resp) await message.reply(resp.content)
// 	// })

// });

// client.initialize();
}
init();
