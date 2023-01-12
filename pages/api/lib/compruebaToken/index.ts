import type { NextApiRequest, NextApiResponse } from 'next'
import parseBearerToken from "parse-bearer-token"
import { decode } from './jwt'

export function comrpuebaToken(req: NextApiRequest) {
    const token = parseBearerToken(req);
    if (!token) {
        console.error("no hay token")
        return { error: "no hay token" };
    }
    const data = decode(token);
    if (data) return data;
    if (!data) return { error: "Token incorrecto" };

}