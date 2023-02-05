import type { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "controllers/authControllers";
import { sendEmail } from "lib/nodemailer";
import methods from "micro-method-router";
import { handlerCORS } from "externalFunctions/handlerCors";
import * as yup from "yup";
let email = yup
  .object()
  .shape({
    email: yup.string().required(),
  })
  .noUnknown(true)
  .strict();

async function auth(req: NextApiRequest, res: NextApiResponse) {
  try {
    await email.validate(req.body);
    const resp = await sendCode(req.body);
    console.log(resp);
    await sendEmail(resp.email, resp.codigo);
    res.send({ codigo: resp.codigo });
  } catch (err) {
    console.log("no paso");

    res.status(400).send({ error: err });
  }
}
const handler = methods({
  post: auth,
});
export default handlerCORS(handler);
