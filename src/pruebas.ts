import transcribeAudio from './audioai';
import fs from 'fs';

function crearArchivoTXT(contenido: string, nombreArchivo: string): void {
  fs.writeFile(nombreArchivo, contenido, (err) => {
    if (err) {
      console.error('Error al crear el archivo:', err);
      return;
    }
    console.log(`Archivo ${nombreArchivo} creado correctamente.`);
  });
}

const nombreArchivo = 'archivo.txt';
const audiosFile = ["./Audios/20230707_164407(1).mp3","./Audios/20230707_164407(1).mp3"]
async function init(){

    try {
        
        await transcribeAudio(audiosFile[0]).then((transcription) => {
            console.log("Transcripción del audio:::", transcription);
        crearArchivoTXT(transcription, nombreArchivo);}
        )
    } catch (error) {
        console.log(error);
    }

}
init()