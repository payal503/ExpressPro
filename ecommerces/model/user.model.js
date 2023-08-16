import pool from "../db/dbConfig.js";

export default class User {
    constructor(id, userName, email, password, contact) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.contact = contact;
    }

    save() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "insert into user(userName,email,password,contact) values(?,?,?,?)";
                    con.query(sql, [this.userName, this.email, this.password, this.contact], (err, result) => {
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                }
                else
                    reject(err);
            })
        });
    }

    signin() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select * from user where email=? and password=?";
                    con.query(sql, [this.email, this.password], (err, result) => {
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                }
                else
                    console.log(err);
            })
        })
    }
}