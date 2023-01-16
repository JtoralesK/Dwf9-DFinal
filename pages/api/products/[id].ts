import type { NextApiRequest, NextApiResponse } from 'next'
import methods from 'micro-method-router'
import { getProduct } from '../../../controllers/productControllers';
import * as yup from 'yup';

let schema = yup.object().shape({
    id: yup.string().required(),
}).noUnknown(true).strict();

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
        const id = req.query.id as string;
      const product = await getProduct(id);        
      res.send(product);    
      
}
})
