import type { NextApiRequest, NextApiResponse } from 'next'
import {comrpuebaToken} from"./lib/compruebaToken/index"
export default function me(req:NextApiRequest,res:NextApiResponse){
    const resp = comrpuebaToken(req,res);
    res.send(resp);
}