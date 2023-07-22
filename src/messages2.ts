import WAWebJS from "whatsapp-web.js";
import fs from "fs";
import { convertAudio } from "./converAudio";
import ai from "./openai";
import transcribeAudio from "./audioai";
import config from "./config";

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
function modifyEnvFile(apiKey) {
  // Leer el contenido actual del archivo .env o crearlo si no existe
  fs.readFile(".env", 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // El archivo no existe, lo creamos con el nuevo APIKEY
        const content = `APIKEY=${apiKey}\n`;
        fs.writeFile(".env", content, 'utf8', (err) => {
          if (err) {
            console.error('Error al crear el archivo .env:', err);
          } else {
            console.log('Archivo .env creado correctamente.');
          }
        });
      } else {
        console.error('Error al leer el archivo .env:', err);
      }
      return;
    }

    // El archivo .env existe, procedemos a modificar el APIKEY
    const lines = data.split('\n');
    const updatedLines = lines.map(line => {
      if (line.startsWith('APIKEY=')) {
        return `APIKEY=${apiKey}`;
      }
      return line;
    });
    const updatedContent = updatedLines.join('\n');

    // Escribir el contenido actualizado en el archivo .env
    fs.writeFile(".env", updatedContent, 'utf8', (err) => {
      if (err) {
        console.error('Error al escribir en el archivo .env:', err);
      } else {
        console.log('Archivo .env actualizado correctamente.');
      }
    });
  });
}
const messageFuncion = async (message: WAWebJS.Message) => {
  const regexTranscribir = /\btranscribir\b/i;
  const regexObservacion = /\bobservacion\b/i;
  const regexNewApiKey = /\bapikey\b/i;
  const mensaje = quitarTildes(message.body.trim().toLocaleLowerCase());

  if (mensaje.match(regexTranscribir) && message.hasQuotedMsg) {
    (await message.getChat()).sendMessage("transcribiendo audio...");

    try {
      const mediaToDownload = await message.getQuotedMessage();
      if (mediaToDownload.hasMedia) {
        const mediaData = await mediaToDownload.downloadMedia();
        const filePath = `./Audios/${Date.now()}.ogg`;
        fs.writeFileSync(filePath, mediaData.data, "base64");
        const audioConverted = await convertAudio(filePath);
        await transcribeAudio(audioConverted)
          .then(async (transcription) => {
            await message.reply(transcription);
            fs.unlinkSync(filePath);
            fs.unlinkSync(audioConverted);
          })
          .catch((error) => {
            console.error("Error:", error);
            message.reply("Hubo un error, intente de mas tarde");
            fs.unlinkSync(filePath);
            fs.unlinkSync(audioConverted);
          });
      } else {
        console.log(mediaToDownload.type);
        message.reply("El mensaje no tiene audio");
      }
    } catch (error) {
      console.log("Error:::", error);
      message.reply("Hubo un error, intente de mas tarde");
    }
  }
  if (mensaje.match(regexObservacion) && message.hasQuotedMsg) {
    (await message.getChat()).sendMessage("realizando observacion...");
    try {
      const textToObservar = await message.getQuotedMessage();
      if (textToObservar.type == "chat") {
        const text = textToObservar.body;

        const context = `eres un ayudante de un trabajador. te pasare una observación. haz un objetivo, inventa un seguimiento y reemplaza {NOMBRE} por el nombre dado en la observacion.
    sigue el siguiente ejemplo :
    "Según la observación inicial, se ha identificado que el adulto mayor, { NOMBRE }, cuenta con una red de apoyo limitada y presenta dificultades cognitivas que dificultan su capacidad para relacionarse con los demás y su entorno. Por lo tanto, se ha establecido el siguiente objetivo para su intervención:
    
    Objetivo: Establecer espacios donde { NOMBRE } pueda mejorar su autoestima y facilitar su interacción con el entorno, a través del desarrollo de su capacidad cognitiva. Esto se logrará mediante la implementación de actividades que promuevan el ejercicio cognitivo, fomenten la participación social y fortalezcan su red de apoyo, con el fin de mejorar su bienestar emocional y su calidad de vida.
    
    Seguimiento: { NOMBRE } ha expresado que durante los encuentros realizados se ha sentido más acompañado y ha participado en actividades que han contribuido al desarrollo de su potencial cognitivo. Como resultado, ha logrado desenvolverse de manera más efectiva en su entorno. Es importante destacar que todos estos aspectos están interrelacionados y se refuerzan mutuamente."`;
        const prompt = `Observacion:${text}`;

        const respuesta: any = await ai(prompt, context);
        console.log("respuesta de observacion", respuesta.content);
        await message.reply(respuesta.content);
      } else {
        message.reply("El mensaje no tiene texto");
      }
    } catch (error) {
      console.log("Error:::", error);
      message.reply("Hubo un error, intente de mas tarde");
    }
  }
  if (mensaje.match(regexNewApiKey)) {

    try {
      console.log(message.body);
      const apikey = message.body.split(" ")[1].trim()
      config.APIKEY = apikey;
      modifyEnvFile(apikey);
      message.reply("APIKEY modificada exitosamente, realizando reinicio...");
      
    } catch (error) {
      message.reply("Syntaxis erronea, intente de nuevo: apikey sk-...");
      
    }

  }
};
export default messageFuncion;
