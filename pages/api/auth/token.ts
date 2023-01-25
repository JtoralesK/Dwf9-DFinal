import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { verificaCode } from "controllers/authControllers";
import * as yup from "yup";
import { handlerCORS } from "externalFunctions/handlerCors";

const emailYCode = yup
  .object()
  .shape({
    email: yup.string().required(),
    code: yup.number().required(),
  })
  .noUnknown(true)
  .strict();

async function getToken(req: NextApiRequest, res: NextApiResponse) {
  try {
    await emailYCode.validate(req.body);
    const { email, code } = req.body;
    const result = await verificaCode(email, code);
    if (result.error) {
      res.status(401).send(result);
    } else {
      res.send(result);
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
}
const handler = methods({
  post: getToken,
});
export default handlerCORS(handler);
