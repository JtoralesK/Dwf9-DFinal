import { pool as connection } from "lib/db-sql/connection";
export class User {
  id: number;
  email: string;
  nombre: string;
  address: string;
  constructor(id) {
    this.id = id;
  }
  async pull() {
    const res = await connection.query(
      `SELECT nombre,email,address,userId from users where userId = ${this.id};`
    );
    try {
      const data = res[0];
      const { email, nombre, address } = data[0];
      this.email = email;
      this.nombre = nombre;
      this.address = address;
    } catch (err) {
      console.error("erorr: no se pudo traer la data");
    }
  }
  async push() {
    await connection.query(
      `UPDATE users SET nombre = '${this.nombre}', address = '${this.address}' where userId = ${this.id};`
    );
    try {
      return this;
    } catch (err) {
      console.error("error: no se pudo actualizar el registro");
    }
  }
  static async createUser(email: string) {
    const res = await connection.query(
      `INSERT into users (email) VALUES ('${email}');`
    );
    try {
      const data: any = res[0];
      const newUser = new User(data.insertId);
      await newUser.pull();
      return newUser;
    } catch (err) {
      console.log(err, "error");
      return null;
    }
  }
}
