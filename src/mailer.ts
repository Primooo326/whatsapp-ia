import nodemailer from 'nodemailer';

 async function sendEmailWithImage(urlImage:string) {
  try {
    // Configura el servicio de correo electrónico que vas a utilizar (ejemplo: Gmail)
    const transporter = nodemailer.createTransport({
        host: "mail.networking.miami",
        port: 465,
        secure: true,
        auth: {
          user: "noreply@networking.miami",
          pass: "Miami2023$",
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
        from: '"Eskato Server" <noreply@networking.miami>',
      to: 'juan.dev.326@gmail.com',
      subject: 'Qr Whatsapp ia',
      html: htmlContent,
    };

    // Envía el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
}


export default sendEmailWithImage