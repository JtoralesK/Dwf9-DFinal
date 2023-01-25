import type { NextApiRequest, NextApiResponse } from "next";
import { meData, actualizaMeData } from "controllers/userControllers";
import methods from "micro-method-router";
import * as yup from "yup";

let schema = yup
  .object()
  .shape({
    nombre: yup.string(),
    address: yup.string(),
  })
  .noUnknown(true)
  .strict();

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const resp = await meData(req);
    res.send(resp);
  },
  async patch(req: NextApiRequest, res: NextApiResponse) {
    try {
      await schema.validate(req.body);
      const resp = await actualizaMeData(req, req.body);
      res.send(resp);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  },
});
