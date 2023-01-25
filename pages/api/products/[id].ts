import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getProduct } from "controllers/productControllers";
import { handlerCORS } from "externalFunctions/handlerCors";
async function getMyProduct(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  const product = await getProduct(id);
  res.status(200).send({ res: product });
}
const handler = methods({
  get: getMyProduct,
});
export default handlerCORS(handler);
