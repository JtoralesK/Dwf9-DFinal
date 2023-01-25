import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { intencionDeCompra } from "controllers/orderControllers";
import { handlerCORS } from "externalFunctions/handlerCors";

async function doOrder(req: NextApiRequest, res: NextApiResponse) {
  const intCompra = await intencionDeCompra(req);
  if (intCompra.error) {
    res.send({ error: intCompra.error });
  } else {
    res.send(intCompra);
  }
}
const handler = methods({
  post: doOrder,
});

export default handlerCORS(handler);
