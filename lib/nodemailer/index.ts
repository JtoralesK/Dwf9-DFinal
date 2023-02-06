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
  const objEmail = {
    from: "Ecommerce Apx",
    to: email,
    subject: "Codigo",
    text: `${code}`,
  };
  const data = await transporter.sendMail(objEmail);
  try {
    console.log("email send");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
