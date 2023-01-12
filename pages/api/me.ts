import type { NextApiRequest, NextApiResponse } from 'next'
import { meData } from '../../controllers/userControllers';

export default async function me(req: NextApiRequest, res: NextApiResponse) {
    const resp = await meData(req);    
    res.send(resp);
}