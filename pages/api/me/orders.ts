import type { NextApiRequest, NextApiResponse } from 'next'
import methods from 'micro-method-router'
import * as yup from 'yup';

let schema = yup.object().shape({
    nombre: yup.string(),
}).noUnknown(true).strict();

export default methods({
    async get(req: NextApiRequest, res: NextApiResponse) {
       res.send({message:"hola spy me/orders"})
    }
    })