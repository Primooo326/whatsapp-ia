const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
var ffmpeg = require('fluent-ffmpeg')
  , fs = require('fs')
  ffmpeg.setFfmpegPath(ffmpegPath)
var outStream = fs.createWriteStream('./Audios/outputs.mp3');

ffmpeg()
  .input('./Audios/7773A1D1B42CCA45C03D7D4EB3D6A34E.ogg')
  .audioQuality(96)
  .toFormat("mp3")
  .on('error', error => console.log(`Encoding Error: ${error.message}`))
  .on('exit', () => console.log('Audio recorder exited'))
  .on('close', () => console.log('Audio recorder closed'))
  .on('end', (data) => console.log('Audio Transcoding succeeded !'))
  .pipe(outStream, { end: true });
