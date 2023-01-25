import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { intencionDeCompra } from "../../../controllers/orderControllers";
export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const intCompra = await intencionDeCompra(req);
    if (intCompra.error) {
      res.send({ error: intCompra.error });
    } else {
      res.send(intCompra);
    }
  },
});
