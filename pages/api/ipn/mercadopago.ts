import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { respMP } from "controllers/orderControllers";
import { handlerCORS } from "externalFunctions/handlerCors";

async function mercadoPago(req: NextApiRequest, res: NextApiResponse) {
  const { id, topic } = req.query;
  if (id && topic) {
    const idNumber: number = JSON.parse(id as string);
    if (topic == "merchant_order") await respMP(idNumber);
  }
  res.send(true);
}
const handler = methods({
  post: mercadoPago,
});
export default handlerCORS(handler);
