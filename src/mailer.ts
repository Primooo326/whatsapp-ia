import nodemailer from 'nodemailer';

 async function sendEmailWithImage(urlImage:string) {
  try {
    // Configura el servicio de correo electrónico que vas a utilizar (ejemplo: Gmail)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'juanskate326@gmail.com',
        pass: 'Skate12345',
      },
    });

    // Contenido HTML del correo electrónico que contiene una imagen
    const htmlContent = `
      <html>
        <body>
          <h1>Ejemplo de correo con imagen</h1>
          <p>¡Hola! Este es un ejemplo de correo electrónico con una imagen incrustada.</p>
          <img src="${urlImage}" alt="Imagen">
        </body>
      </html>
    `;

    // Opciones para el correo electrónico
    const mailOptions = {
      from: 'noreply@eskatoserver.com',
      to: 'juan.dev.326@gmail.com',
      subject: 'Qr Whatsapp ia',
      html: htmlContent,
      attachments: [
        {
          filename: 'imagen.jpg', // Nombre del archivo adjunto
          path: 'urlImage', // Ruta a la imagen que deseas adjuntar
          cid: 'qrImagen', // ID único para referenciar la imagen en el contenido HTML
        },
      ],
    };

    // Envía el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
}


export default sendEmailWithImage