import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { handlerCORS } from "externalFunctions/handlerCors";
import { getAllOrdersOneUser } from "controllers/orderControllers";

async function getOrder(req: NextApiRequest, res: NextApiResponse) {
  const resp = await getAllOrdersOneUser(req);
  res.send({ orders: resp });
}
const handler = methods({
  get: getOrder,
});

export default handlerCORS(handler);
