import axios from 'axios';
import fs from 'fs';
export default async function transcribeAudio(audioFilePath) {
  try {
    // Leer el archivo de audio como base64
    const audioData = fs.readFileSync(audioFilePath, 'base64');

    // Configurar la solicitud HTTP POST
    const url = 'https://api.openai.com/v1/audio/transcriptions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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' // Reemplaza con tu clave de API de OpenAI
    };
    const data = {
      'inputs': {
        'audio': audioData,
        'content_type': 'audio/mp3'
      },
      'output_config': {
        'speech_to_text': true
      }
    };

    // Enviar la solicitud HTTP POST
    const response = await axios.post(url, data, { headers });

    // Obtener la transcripción del texto
    const transcription = response;
	console.log(transcription);

    return transcription;
  } catch (error) {
    console.error('Error al transcribir el audio:', error);
    throw error;
  }
}

// Ejemplo de uso
const audioFilePath = './Audios/outputs.mp3';

transcribeAudio(audioFilePath)
  .then((transcription) => {
    console.log('Transcripción del audio:', transcription);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
