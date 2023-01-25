import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getOrder } from "../../../controllers/orderControllers";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const id = JSON.parse(req.query.id as string);
    const order = await getOrder(id);
    console.log(order);

    res.send({ order });
  },
});
