import pool from '../db/dbConfig.js';

export default class OrderDetails {
    constructor(id, userId, date, billAmount, contactPerson, contactNumber, deliveryAddress, status, paymentMode) {
        this.id = id;
        this.userId = userId;
        this.date = date;
        this.billAmount = billAmount;
        this.contactPerson = contactPerson;
        this.contactNumber = contactNumber;
        this.deliveryAddress = deliveryAddress;
        this.status = status;
        this.paymentMode = paymentMode;
    }

    save() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "insert into order_detail(id,userId,date,billAmount,contactPerson,contactNumber,deliveryAddress,status,paymentMode) values(?,?,?,?,?,?,?,?,?)";
                    con.query(sql, [this.id, this.userId, this.date, this.billAmount, this.contactPerson, this.contactNumber, this.deliveryAddress, this.status, this.paymentMode], (err, result) => {
                        con.release()
                        err ? reject(err) : resolve(result);

                    })
                }
                else {
                    reject(err);
                }
            })
        })

    }

    static getOrderByUserId(userId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select * from order_detail where userId = ?";
                    con.query(sql, [userId], (err, result) => {
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }
                else
                    reject(err);
            });
        });
    }

    static getOrderhistory(orderId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select order_items.qty,product.title,product.id as userName,product.brand,product.description,product.thumbnail,order_detail.date,order_detail.billAmount,order_detail.deliveryAddress,order_detail.id from order_detail inner join order_items on order_detail.id = order_items.orderdetailsId inner join product on product.id=order_items.productId where orderdetailsId = ?;";
                    con.query(sql, [orderId], (err, result) => {
                        console.log(result);
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                }
                else {
                    reject(err);
                }
            })
        })
    }
}
