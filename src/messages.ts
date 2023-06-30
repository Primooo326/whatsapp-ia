import ai from "./openai";
import yt from "./yt";
import { Client, MessageMedia } from "whatsapp-web.js";

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
export default async function (msg: string, number: string, isMedia?: boolean) {
  const regexPollito = /\bpollito\b/i;
  const regexDatoCurioso = /\bdato curioso\b/i;
  const regexBuenosDias = /\bbuenos dias\b/i;

  //hacer la funcion de transcribir
  const regexTranscribir = /\btranscribir\b/i;
  const regexObservacion = /\bobservacion\b/i;

  const pollita = myContacts[0];

  const mensaje = quitarTildes(msg.trim().toLocaleLowerCase());
  console.log("msg:::", msg);
  let respuesta;
  if(isMedia){
    console.log("es media");
    const context = `eres un ayudante de un trabajador. te pasare una observación. haz un objetivo, inventa un seguimiento y reemplaza {NOMBRE} por el nombre dado en la observacion.
    sigue el siguiente ejemplo :
    "Según la observación inicial, se ha identificado que el adulto mayor, { NOMBRE }, cuenta con una red de apoyo limitada y presenta dificultades cognitivas que dificultan su capacidad para relacionarse con los demás y su entorno. Por lo tanto, se ha establecido el siguiente objetivo para su intervención:
    
    Objetivo: Establecer espacios donde { NOMBRE } pueda mejorar su autoestima y facilitar su interacción con el entorno, a través del desarrollo de su capacidad cognitiva. Esto se logrará mediante la implementación de actividades que promuevan el ejercicio cognitivo, fomenten la participación social y fortalezcan su red de apoyo, con el fin de mejorar su bienestar emocional y su calidad de vida.
    
    Seguimiento: { NOMBRE } ha expresado que durante los encuentros realizados se ha sentido más acompañado y ha participado en actividades que han contribuido al desarrollo de su potencial cognitivo. Como resultado, ha logrado desenvolverse de manera más efectiva en su entorno. Es importante destacar que todos estos aspectos están interrelacionados y se refuerzan mutuamente."`;
    const prompt = `Observacion:${msg}`

    return respuesta = await ai(prompt, context);
  }
  if (pollita.number === number) {



    if (msgBuenasNoches.includes(mensaje)) {
      respuesta = await ai(
        pollita.prompts.buenasnoches.prompt,
        pollita.prompts.buenasnoches.context
      );
      console.log(respuesta);
      return respuesta;
    } else if (msgBuenosDias.includes(mensaje)) {
      respuesta = await ai(
        pollita.prompts.buenosdias.prompt,
        pollita.prompts.buenosdias.context
      );
      console.log(respuesta);
      return respuesta;
    } else if (regexPollito.test(mensaje)) {
      respuesta = await ai(
        pollita.prompts.poesia.prompt,
        pollita.prompts.poesia.context
      );
      console.log(respuesta);
      return respuesta;
    }
  }
  if (regexDatoCurioso.test(mensaje)) {
    respuesta = await ai(
      "tell me a curious fact, use a funny tone, use emojis, do it in Spanish",
      "dime un dato curioso"
    );
    console.log(respuesta);
    return respuesta;
  }

  // if (mensaje.includes("/youtube")) {
  //   client.sendMessage(number, "downloadin playlist");
  //   return await yt(msg);
  // }
  // if (mensaje.includes("/media")) {
  //   const file = new File(["../canciones.zip"], "canciones.zip");
  //   const fr = new FileReader();
  //   fr.readAsDataURL(file);
  //   let base64EncodedData: any = fr.result;
  //   console.log(typeof base64EncodedData);
  //   const media = new MessageMedia(file.type, base64EncodedData);
  //   client.sendMessage(number, media);
  // }

  // else if (regexBuenosDias.test(mensaje)) {
  // 	respuesta = await ai(
  // 		"I will give you a date no matter how far in the future it is and you will return a curious fact that happened in the same month and day in the past, use emojis and use a funny tone, do it in Spanish, start the answer with 'a day like today. ..'",
  // 		new Date().toLocaleDateString(),
  // 	);
  // 	console.log(respuesta);
  // 	return respuesta;
  // }
}








//! mensaje 1 y 2 donde puedo ver como el mensaje 2 hace un reply al mensaje 1 por medio del id
// const req =  {
//   _data: {
//     id: {
//       fromMe: false,
//       remote: '573118188522@c.us',
//       id: 'C9F868AD1FB1417392234ABDF30ABD23',
//       _serialized: 'false_573118188522@c.us_C9F868AD1FB1417392234ABDF30ABD23'
//     },
//     body: 'Audio',
//     type: 'chat',
//     t: 1688092876,
//     notifyName: 'Luz Stella Lizarazo',
//     from: '573118188522@c.us',
//     to: '573196458411@c.us',
//     self: 'in',
//     ack: 1,
//     isNewMsg: true,
//     star: false,
//     kicNotified: false,
//     recvFresh: true,
//     isFromTemplate: false,
//     pollInvalidated: false,
//     isSentCagPollCreation: false,
//     latestEditMsgKey: null,
//     latestEditSenderTimestampMs: null,
//     broadcast: false,
//     mentionedJidList: [],
//     groupMentions: [],
//     isVcardOverMmsDocument: false,
//     isForwarded: false,
//     labels: [],
//     hasReaction: false,
//     productHeaderImageRejected: false,
//     lastPlaybackProgress: 0,
//     isDynamicReplyButtonsMsg: false,
//     isMdHistoryMsg: false,
//     stickerSentTs: 0,
//     isAvatar: false,
//     requiresDirectConnection: false,
//     links: []
//   },
//   mediaKey: undefined,
//   id: {
//     fromMe: false,
//     remote: '573118188522@c.us',
//     id: 'C9F868AD1FB1417392234ABDF30ABD23',
//     _serialized: 'false_573118188522@c.us_C9F868AD1FB1417392234ABDF30ABD23'
//   },
//   ack: 1,
//   hasMedia: false,
//   body: 'Audio',
//   type: 'chat',
//   timestamp: 1688092876,
//   from: '573118188522@c.us',
//   to: '573196458411@c.us',
//   author: undefined,
//   deviceType: 'android',
//   isForwarded: false,
//   forwardingScore: 0,
//   isStatus: false,
//   isStarred: false,
//   broadcast: false,
//   fromMe: false,
//   hasQuotedMsg: false,
//   hasReaction: false,
//   duration: undefined,
//   location: undefined,
//   vCards: [],
//   inviteV4: undefined,
//   mentionedIds: [],
//   orderId: undefined,
//   token: undefined,
//   isGif: false,
//   isEphemeral: undefined,
//   links: []
// }
// const res =  {
//   _data: {
//     id: {
//       fromMe: false,
//       remote: '573118188522@c.us',
//       id: 'A3D2694ECA7B98F8EE53ED539ADE95CF',
//       _serialized: 'false_573118188522@c.us_A3D2694ECA7B98F8EE53ED539ADE95CF'
//     },
//     body: '/transcribir',
//     type: 'chat',
//     t: 1688092884,
//     notifyName: 'Luz Stella Lizarazo',
//     from: '573118188522@c.us',
//     to: '573196458411@c.us',
//     self: 'in',
//     ack: 1,
//     isNewMsg: true,
//     star: false,
//     kicNotified: false,
//     recvFresh: true,
//     isFromTemplate: false,
//     thumbnail: '',
//     richPreviewType: 0,
//     pollInvalidated: false,
//     isSentCagPollCreation: false,
//     latestEditMsgKey: null,
//     latestEditSenderTimestampMs: null,
//     broadcast: false,
//     quotedMsg: { type: 'chat', body: 'Audio' },
//     quotedStanzaID: 'C9F868AD1FB1417392234ABDF30ABD23',
//     quotedParticipant: '573118188522@c.us',
//     mentionedJidList: [],
//     groupMentions: [],
//     isVcardOverMmsDocument: false,
//     labels: [],
//     hasReaction: false,
//     inviteGrpType: 'DEFAULT',
//     productHeaderImageRejected: false,
//     lastPlaybackProgress: 0,
//     isDynamicReplyButtonsMsg: false,
//     isMdHistoryMsg: false,
//     stickerSentTs: 0,
//     isAvatar: false,
//     requiresDirectConnection: false,
//     links: []
//   },
//   mediaKey: undefined,
//   id: {
//     fromMe: false,
//     remote: '573118188522@c.us',
//     id: 'A3D2694ECA7B98F8EE53ED539ADE95CF',
//     _serialized: 'false_573118188522@c.us_A3D2694ECA7B98F8EE53ED539ADE95CF'
//   },
//   ack: 1,
//   hasMedia: false,
//   body: '/transcribir',
//   type: 'chat',
//   timestamp: 1688092884,
//   from: '573118188522@c.us',
//   to: '573196458411@c.us',
//   author: undefined,
//   deviceType: 'android',
//   isForwarded: undefined,
//   forwardingScore: 0,
//   isStatus: false,
//   isStarred: false,
//   broadcast: false,
//   fromMe: false,
//   hasQuotedMsg: true,
//   hasReaction: false,
//   duration: undefined,
//   location: undefined,
//   vCards: [],
//   inviteV4: undefined,
//   mentionedIds: [],
//   orderId: undefined,
//   token: undefined,
//   isGif: false,
//   isEphemeral: undefined,
//   links: []
// }

