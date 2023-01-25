import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import * as yup from "yup";
import { getAllOrdersOneUser } from "../../../controllers/orderControllers";
let schema = yup
  .object()
  .shape({
    nombre: yup.string(),
  })
  .noUnknown(true)
  .strict();

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const resp = await getAllOrdersOneUser(req);
    res.send({ orders: resp });
  },
});
