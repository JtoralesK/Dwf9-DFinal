import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import * as yup from "yup";
import { getProductByQuery } from "controllers/productControllers";
import { handlerCORS } from "externalFunctions/handlerCors";

let queryObj = yup
  .object()
  .shape({
    q: yup.string().required(),
    offset: yup.number().required(),
    limit: yup.number().required(),
  })
  .noUnknown(true)
  .strict();

async function search(req: NextApiRequest, res: NextApiResponse) {
  try {
    const offset = JSON.parse(req.query.offset as string);
    const limit = JSON.parse(req.query.limit as string);
    const q = req.query.q as string;
    await queryObj.validate({ q, offset, limit });
    const respuesta = await getProductByQuery(q, offset, limit);
    res.send(respuesta);
  } catch (err) {
    res.status(400).send({ erorr: "falta algun parametro" });
  }
}
const handler = methods({
  get: search,
});

export default handlerCORS(handler);
