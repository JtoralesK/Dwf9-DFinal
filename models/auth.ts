import { pool as connection } from "lib/db-sql/connection";
import isAfter from "date-fns/isAfter";
export class Auth {
  userId: number;
  codigo: number;
  fechaLimite: Date;
  email: string;
  constructor(id: number) {
    this.userId = id;
  }
  show() {
    console.log({
      userId: this.userId,
      codigo: this.codigo,
      fechaLimite: this.fechaLimite,
      email: this.email,
    });
  }
  async pull() {
    const res = await connection.query(
      `SELECT codigo,email,fechaLimite from auths where userId = ${this.userId};`
    );
    try {
      const data = res[0];
      const { email, codigo, fechaLimite } = data[0];
      this.email = email;
      this.codigo = codigo;
      this.fechaLimite = fechaLimite;
    } catch (err) {
      console.error("error");
    }
  }
  async push() {
    const res = await connection.query(`UPDATE auths
    set
    codigo = ${this.codigo}, 
    fechaLimite = '${this.fechaLimite}'
    where userId = ${this.userId};`);
    try {
      return this;
    } catch (err) {
      console.error("error");
      return null;
    }
  }
  static async findEmail(email: string) {
    const res = await connection.query(
      `SELECT userId,codigo,fechaLimite,email from auths where email = '${email}';`
    );
    try {
      const data: any = res[0];
      let count = 0;
      data.map((e) => count++);
      if (count > 0) {
        const { userId, codigo, fechaLimite } = data[0];
        const auth = new Auth(userId);
        auth.email = email;
        auth.codigo = codigo;
        return auth;
      } else {
        return null;
      }
    } catch (err) {
      console.error(err, "error a");
      return null;
    }
  }
  static async createAuth(data) {
    const { userId, email, codigo, fechaLimite } = data;
    const res = await connection.query(
      `INSERT into auths (userId,codigo,fechaLimite,email) VALUES ('${userId}','${codigo}','${fechaLimite}','${email}');`
    );
    try {
      const newUser = new Auth(userId);
      await newUser.pull();
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }
  isCodeExpired() {
    const now = new Date();
    const expired = isAfter(this.fechaLimite, now);
    if (expired) {
      return true;
    } else {
      return false;
    }
  }
  static async buscaAuthWithCode(email: string, codigo: number) {
    const res = await connection.query(
      `SELECT userId,fechaLimite from auths where email = '${email}' AND codigo = '${codigo}' ;`
    );
    try {
      const data: any = res[0];
      let count = 0;
      data.map((e) => count++);
      if (count > 0) {
        const { userId, fechaLimite } = data[0];
        const auth = new Auth(userId);
        auth.email = email;
        auth.codigo = codigo;
        //ESTAS 2 LINEAS PASAN DE STRING A DATE
        var timestamp = Date.parse(fechaLimite);
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
}
