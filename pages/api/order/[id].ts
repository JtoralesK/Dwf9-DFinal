import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getOrder } from "controllers/orderControllers";
import { handlerCORS } from "externalFunctions/handlerCors";

async function getMyOrder(req: NextApiRequest, res: NextApiResponse) {
  const id = JSON.parse(req.query.id as string);
  const order = await getOrder(id);
  console.log(order);

  res.send({ order });
}
const handler = methods({
  get: getMyOrder,
});

export default handlerCORS(handler);
