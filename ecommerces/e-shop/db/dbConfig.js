import mysql from "mysql2";

// meta-object
let pool = mysql.createPool({
    connectionLimit: 100,
    user: "root",
    password: "101926",
    database: "E_shop",
    host: "localhost"
});

export default pool;