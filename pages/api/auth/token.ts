import type { NextApiRequest, NextApiResponse } from 'next'
import  methods from 'micro-method-router'
import { verificaCode } from '../../../controllers/authControllers'
export default methods({
    async post(req:NextApiRequest,res:NextApiResponse){    
        const {email,code}= req.body;        
        const result = await verificaCode(email,code)
        if(result.error)res.status((401)).send(result);
        res.send({result})
    } 
  
})