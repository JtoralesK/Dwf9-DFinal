import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { syncProducts } from "controllers/productControllers";
export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const data = await syncProducts(req);
    res.json({ pagination: data });
  },
});
