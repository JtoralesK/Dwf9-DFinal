import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

import Cors from "cors";
const cors = Cors({
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

export function handlerCORS(cb) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    cors(req, res, (result) => {
      if (result instanceof Error) return false;
      cb(req, res);
    });
  };
}
