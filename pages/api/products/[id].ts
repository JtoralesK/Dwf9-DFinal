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
/*export  default async  function(req:NextApiRequest, res:NextApiResponse){
  const {limit,offset}= calcula(req.query.limit,req.query.offset,100);
  const {search}= req.query

  const results = await  index.search(search as string, {
      hitsPerPage: limit,
      page: offset>1? Math.floor(offset/limit):0
    })
    res.json({
      results:results.hits,
      pagination:{
          offset,
          limit,
          total:results.nbHits
      }
  })
    console.log(results);


  }
*/