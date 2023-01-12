import type { NextApiRequest, NextApiResponse } from 'next'
import {sendCode} from"../../../controllers/controller"
import { sendEmail } from '../lib/sendgrid';
import  methods from 'micro-method-router'
import {pool as connection} from "../lib/db-sql/connection"
import { User } from '../../../models/user';

export default methods({
    async post(req:NextApiRequest,res:NextApiResponse){      
    const resp = await sendCode(req.body);
    const emailSend = await sendEmail(resp.email,resp.codigo);
    res.send({codigo:resp.codigo});
    } 
  
})