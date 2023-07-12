import axios from 'axios';
import fs from 'fs';
const FormData = require('form-data');
import config from './config';
export default async function transcribeAudio(audioFilePath) {



const token = config.APIKEY; // Reemplaza 'TOKEN' con tu token de autorización
const model = 'whisper-1'; // Modelo de transcripción a utilizar

async function uploadAudioForTranscription() {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(audioFilePath));
    form.append('model', model);
    form.append('language', 'es');
    form.append('response_format', 'text');
    form.append('temperature', 0.2);


    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', form, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': `multipart/form-data; boundary=${form._boundary}`
      }
    });

    return response.data;
  } catch (error) {
    return error
  }
}

return await uploadAudioForTranscription();

}
