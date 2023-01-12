import *as mysql from "mysql2/promise"

  export const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password:process.env.PASSWORD,
    port:JSON.parse(process.env.DBPORT)
  }); 
  
  