import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';

export const convertAudio = async (path: string): Promise<string> => {
  const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
  ffmpeg.setFfmpegPath(ffmpegPath);

  const now = `./Audios/outputs-${Date.now()}.mp3`;
  const outStream = fs.createWriteStream(now);

  await createDirectoryIfNotExists('./Audios');

  await new Promise<void>((resolve, reject) => {
    ffmpeg(path)
      .audioQuality(96)
      .toFormat('mp3')
      .on('error', error => reject(error))
      .on('end', () => resolve())
      .pipe(outStream);
  });

  return now;
};

const createDirectoryIfNotExists = (directoryPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.mkdir(directoryPath, { recursive: true }, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
