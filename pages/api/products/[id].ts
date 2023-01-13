import type { NextApiRequest, NextApiResponse } from 'next'
import methods from 'micro-method-router'
import { getProduct } from '../../../controllers/productControllers';

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const id = JSON.parse(req.query.id as string);
    const product = await getProduct(id);    
    res.send(product);
}
})