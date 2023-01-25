import type { NextApiRequest, NextApiResponse } from "next";
import { meData, actualizaMeData } from "controllers/userControllers";
import methods from "micro-method-router";
import * as yup from "yup";
import { handlerCORS } from "externalFunctions/handlerCors";

let schema = yup
  .object()
  .shape({
    nombre: yup.string(),
    address: yup.string(),
  })
  .noUnknown(true)
  .strict();

async function getMe(req: NextApiRequest, res: NextApiResponse) {
  const resp = await meData(req);
  res.send({ resp, methid: "get" });
}
async function patchMe(req: NextApiRequest, res: NextApiResponse) {
  try {
    await schema.validate(req.body);
    const resp = await actualizaMeData(req, req.body);
    res.send({ resp, methid: "patch" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
}
const handler = methods({
  get: getMe,
  patch: patchMe,
});

export default handlerCORS(handler);
