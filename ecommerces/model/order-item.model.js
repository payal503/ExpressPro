import pool from '../db/dbConfig.js';

export default class OrderItems {
    constructor(id, orderdetailsId, productId, qty) {
        this.id = id;
        this.orderdetailsId = orderdetailsId;
        this.productId = productId;
        this.qty = qty;
    }

    static save(cartItems, orderId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "insert into order_items(orderdetailsId,productId,qty) values(?,?,?)";
                    cartItems.forEach(item => {
                        // console.log(item.id + "hegfg  ijnijk ");
                        con.query(sql, [orderId, item.id, item.qty], (err, result) => {
                            if (err)
                                reject(err);
                        })
                    })
                    resolve();
                }
                else
                    reject(err);
            })
        })
    }
}