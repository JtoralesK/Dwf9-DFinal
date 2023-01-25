import type { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "../../../controllers/authControllers";
import { sendEmail } from "../lib/sendgrid";
import methods from "micro-method-router";

import * as yup from "yup";
let email = yup
  .object()
  .shape({
    email: yup.string().required(),
  })
  .noUnknown(true)
  .strict();

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    try {
      await email.validate(req.body);
      const resp = await sendCode(req.body);
      await sendEmail(resp.email, resp.codigo);
      res.send({ codigo: resp.codigo });
    } catch (err) {
      res.status(400).send({ error: err });
    }
  },
});
