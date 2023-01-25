import type { NextApiRequest, NextApiResponse } from "next";
import { meData, actualizaMeData } from "../../../controllers/userControllers";
import methods from "micro-method-router";
import * as yup from "yup";

let schema = yup
  .object()
  .shape({
    address: yup.string().required(),
  })
  .noUnknown(true)
  .strict();

export default methods({
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
