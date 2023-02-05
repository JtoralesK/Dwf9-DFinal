import nodemailer from "nodemailer";

export async function sendEmail(email: string, code: number) {
  console.log("sendEmail function");
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "jtorales2016@gmail.com", // generated ethereal user
      pass: process.env.NODEMAILER_API_KEY, // generated ethereal password
    },
  });
  transporter.verify();
  transporter.sendMail(
    {
      from: "Ecommerce Apx",
      to: email,
      subject: "Codigo",
      text: `${code}`,
    },
    (error, info) => {
      if (error) {
        console.log(error);
        throw error;
      } else {
        console.log("email enviado");
      }
    }
  );
}
