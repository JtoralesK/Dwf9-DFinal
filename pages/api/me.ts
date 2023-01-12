import type { NextApiRequest, NextApiResponse } from 'next'
import { meData } from '../../controllers/userControllers';
export default async function me(req: NextApiRequest, res: NextApiResponse) {
    const me = await meData(req);
    console.log(me);
    
    res.send(me);
}