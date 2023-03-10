import type { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "controllers/authControllers";
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
    console.error(req.body);

    await email.validate(req.body);
    const resp = await sendCode(req.body);
    res.send(resp);
  } catch (err) {
    console.log("no paso");

    res.status(400).send({ error: err });
  }
}
const handler = methods({
  post: auth,
});
export default handlerCORS(handler);
