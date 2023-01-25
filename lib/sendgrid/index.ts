import sgMail from "@sendgrid/mail";

export function sendEmail(email: string, code: number) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${email}`, // Change to your recipient
    from: "jtorales2016@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>Tu codigo es ${code}`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}
