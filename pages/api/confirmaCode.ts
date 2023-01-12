import { Auth } from "../../models/auth"
import { pool as connection } from "./lib/db-sql/connection"
import { generate } from "./lib/compruebaToken/jwt"
export async function buscaAuthWithCode(email: string, codigo: number) {
    const res = await connection.query(`SELECT userId,fechaLimite from auth where email = '${email}' AND codigo = '${codigo}' ;`)
    try {
        const data: any = res[0]
        let count = 0;
        data.map((e) => count++)
        if (count > 0) {
            const { userId, fechaLimite } = data[0];
            const auth = new Auth(userId)
            auth.email = email;
            auth.codigo = codigo;
            //ESTAS 2 LINEAS PASAN DE STRING A DATE
            var timestamp = Date.parse(fechaLimite)
            var date: Date = new Date(timestamp);
            auth.fechaLimite = date;
            return auth;
        } else {
            console.log("no hubo coincidencias");
            return false;
        }
    } catch (err) {
        console.error(err, "error a");
        return null;
    }
}
export async function verificaCode(email: string, code: number) {
    const auth = await buscaAuthWithCode(email, code);
    if (!auth) return { error: "no existe ese codigo" };

    if (auth.isCodeExpired()) {
        const token = await generate({ userId: auth.userId })
        return { token };

    } else {
        return { error: "codigo expiro" };
    }



}