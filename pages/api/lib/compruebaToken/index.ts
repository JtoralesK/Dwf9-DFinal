import type { NextApiRequest, NextApiResponse } from 'next'
import parseBearerToken  from"parse-bearer-token"
import { decode } from './jwt'
import jwt from "jsonwebtoken"

 function handler (req:NextApiRequest,res:NextApiResponse,data){
    res.send({"data":data})
}

export function comrpuebaToken(req:NextApiRequest,res:NextApiResponse){
    const token = parseBearerToken(req);            
        if(!token){
            console.error("token incorrect")
            return false;
            //res.status(401).send({"message":"token incorrect"})
        }
            const data = decode(token,res);                             
            if(data.decoded)return data.decoded
            if(data.err)res.send({"message":"token incorrect"})
            
        
}