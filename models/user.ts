import type { NextApiRequest, NextApiResponse } from 'next'
import methods from 'micro-method-router'
import { pool as connection } from "../pages/api/lib/db-sql/connection"
type Me = {
    email: string;
    nombre: string;
}
export class User {
    id: number;
    email: string;
    nombre: string;
    constructor(id) {
        this.id = id;
    }
    ///getters

    async pull() {
        const res = await connection.query(`SELECT nombre,email,userId from user where userId = ${this.id};`)
        try {
            const data = res[0];
            const { email } = data[0];
            this.email = email;
        } catch (err) {
            console.error("errore");
        }
    }

    static async createUser(email: string) {
        const res = await connection.query(`INSERT into user (email) VALUES ('${email}');`)
        try {
            const data: any = res[0];
            const newUser = new User(data.insertId);
            await newUser.pull();
            return newUser;
        } catch (err) {
            console.log(err, "error");
            return null
        }
    }



};