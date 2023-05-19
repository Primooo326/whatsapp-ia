import ai from "./openai";
export interface IContact {
	name: string;
	number: string;
	prompts: any;
}
export interface IPrompt {
	name: string;
	prompt: {
		prompt: string;
		context: string;
	};
}

const myContacts: IContact[] = [
	{
		name: "pollita",
		number: "573208471126@c.us",
		prompts: {
			poesia: {
				prompt: "You are a romantic poet, you speak Spanish perfectly",
				context:
					"Write a love poem in Spanish addressed to a woman named Nicoll who is my girlfriend, use emojis",
			},
			buenasnoches: {
				prompt: "You are a romantic poet, you speak Spanish perfectly",
				context:
					"Write a good night love poem in Spanish addressed to a woman named Nicoll who is my girlfriend, use emojis, the poem should not exceed 4 sentences",
			},
			buenosdias: {
				prompt: "You are a romantic poet, you speak Spanish perfectly",
				context:
					"Write a good morning love poem in Spanish addressed to a woman named Nicoll who is my girlfriend, use emojis, the poem should not exceed 4 sentences",
			},
		},
	},
];

const msgBuenasNoches = [
	"hasta mañana",
	"que duermas",
	"que descanses",
	"duerme rico",
	"mañana hablamos",
	"despidamonos",
	"buenas noches",
];

const msgBuenosDias = [
	"hola",
	"como estas",
	"buenos dias",
	"menas",
	"menassss",
	"hola mi amor",
];
function quitarTildes(texto: string) {
	const tildes = [
		{ base: "a", letras: /[áàäâ]/gi },
		{ base: "e", letras: /[éèëê]/gi },
		{ base: "i", letras: /[íìïî]/gi },
		{ base: "o", letras: /[óòöô]/gi },
		{ base: "u", letras: /[úùüû]/gi },
		{ base: "n", letras: /[ñ]/gi },
		{ base: "c", letras: /[ç]/gi },
	];

	// Reemplazar las letras con tilde por las letras sin tilde
	tildes.forEach(({ base, letras }) => {
		texto = texto.replace(letras, base);
	});

	return texto;
}
export default async function (message:any) {
	const msg = message.body
	const number = message.from
	const regexPollito = /\bpollito\b/i;
	const regexDatoCurioso = /\bdato curioso\b/i;
	const regexBuenosDias = /\bbuenos dias\b/i;
	const pollita = myContacts[0];

	const mensaje = quitarTildes(msg.trim().toLocaleLowerCase());
	console.log("msg:::", msg);
	let respuesta;

	if (pollita.number === number) {
		if (msgBuenasNoches.includes(mensaje)) {
			respuesta = await ai(
				pollita.prompts.buenasnoches.prompt,
				pollita.prompts.buenasnoches.context,
			);
			console.log(respuesta);
			return respuesta;
		} else if (msgBuenosDias.includes(mensaje)) {
			respuesta = await ai(
				pollita.prompts.buenosdias.prompt,
				pollita.prompts.buenosdias.context,
			);
			console.log(respuesta);
			return respuesta;
		} else if (regexPollito.test(mensaje)) {
			respuesta = await ai(
				pollita.prompts.poesia.prompt,
				pollita.prompts.poesia.context,
			);
			console.log(respuesta);
			return respuesta;
		}
	}
	if (regexDatoCurioso.test(mensaje)) {
		respuesta = await ai(
			"tell me a curious fact, use a funny tone, use emojis, do it in Spanish",
			"dime un dato curioso",
		);
		console.log(respuesta);
		return respuesta;
	}
	else if (regexBuenosDias.test(mensaje)) {
		respuesta = await ai(
			"I will give you a date no matter how far in the future it is and you will return a curious fact that happened in the same month and day in the past, use emojis and use a funny tone, do it in Spanish, start the answer with 'a day like today. ..'",
			new Date().toLocaleDateString(),
		);
		console.log(respuesta);
		return respuesta;
	}
}
