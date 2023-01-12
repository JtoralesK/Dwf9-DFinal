import type { NextApiRequest, NextApiResponse } from 'next'
import {sendCode} from"../../../controllers/authControllers"
import { sendEmail } from '../lib/sendgrid';
import  methods from 'micro-method-router'

export default methods({
    async post(req:NextApiRequest,res:NextApiResponse){      
    const resp = await sendCode(req.body);
    const emailSend = await sendEmail(resp.email,resp.codigo);
    res.send({codigo:resp.codigo});
    } 
  
})