import *as mysql from "mysql2/promise"

  export const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    database: process.env.MYSQLDATABASE,
    password:process.env.MYSQLPASSWORD,
    port:JSON.parse(process.env.MYSQLPORT)
  }); 
  
  