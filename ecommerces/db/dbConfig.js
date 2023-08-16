import mysql from "mysql2";
export default mysql.createPool({
    host: "localhost",
    user: "root",
    password: "101926",
    database: "e_shop",
    connectionLimit: 10
});