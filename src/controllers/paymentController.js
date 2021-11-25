const express = require('express');
const session = require('express-session');
const mysql = require("mysql");
const paypal = require('paypal-rest-sdk');

// Configure paypal
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AWrWDZfHxe3EnGjE_Z3Lq_tWVMZCeMWNLRrxymnvUYP4XAUwiwsCV8fyDCJ36em4TFMJs-zL678G9u1D',
    'client_secret': 'EBO67Et5OswiuYrgtA9wERiDPBzWwwQQYoJH-lVCeKcihgLGGbpFdKfTpmIIP2u5p8GQBQVUPHAxWk0C'
});

//Connection pool
const connection = mysql.createPool({
    connectionLimit: 100,
    multipleStatements: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
let CART;
let TOTAL = 0;
let FINALTOTAL = 0;
let USER;
let USEPOINT = 'no'
let TAKEORHERE = '';
let TABLENUM = 0;
let POINT = 0;
// View choose method
exports.chooseMethod = (req, res) => {
    CART = req.session.cart;
    USER = res.locals.user;
    for (let i = 0; i < CART.length; i++) {
        TOTAL += CART[i].price * CART[i].qty;
    }
    POINT = TOTAL / 1000;
    res.render('payment/select_payment', {
        title: 'Thanh toán',
        cart: CART,
        total: TOTAL
    })
    // res.render('payment/paypal', {
    //     title: 'Paypal',
    //     cart: CART,
    //     user: USER,
    //     total: TOTAL
    // })

}
// POST choose method
exports.payment = (req, res) => {
    let takeorhere = req.body.takeorhere;
    let table_num = req.body.tablenum;
    let usepoint = req.body.usepoint;
    USEPOINT = usepoint;
    TAKEORHERE = takeorhere;
    TABLENUM = table_num;
    let paymethod = req.body.paymethod;
    if (usepoint == 'yes') {
        TOTAL -= USER.point * 100;
    }
    if (paymethod == 'cash') {
        let fullname = USER.lname + ' ' + USER.fname;
        // Insert something
        let sqlPoint = '';
        if (usepoint == 'yes') {
            sqlPoint = ' UPDATE user SET point =' + POINT.toString() + ' WHERE id = ?;'
        } else {
            sqlPoint = ' UPDATE user SET point = point +' + POINT.toString() + ' WHERE id = ?;'
        }
        let insertOrder = 'INSERT INTO orders(fullname, phone, user_id, method, takeorhere, use_point, table_num, total_money) VALUES(?,?,?,?,?,?,?,?);' + sqlPoint;
        connection.query(insertOrder, [fullname, USER.phone, USER.id, 'Tiền mặt', takeorhere, usepoint, table_num, TOTAL, USER.id], (err, results) => {
            if (err) throw err;
            let orderID = results[0].insertId;
            let cart = CART;
            let insertItem = 'INSERT INTO order_detail(order_id, food_name, price, qty, total_money) VALUES ?';
            let items = [];
            for (let i = 0; i < cart.length; i++) {
                items.push([orderID, cart[i].name, cart[i].price, cart[i].qty, cart[i].price * cart[i].qty]);
            }
            connection.query(insertItem, [items], (err, results) => {
                if (err) throw err;
                res.render('payment/success_cash', {
                    title: 'Thành công',
                    user: USER
                })
            })
        })

    } else {
        res.render('payment/paypal', {
            title: 'Paypal',
            user: USER,
            cart: CART,
            total: TOTAL,
            usepoint: USEPOINT
        })
    }

}

exports.paypal = (req, res) => {
    let cart = CART;
    let total = 0;

    let items = [];
    for (let i = 0; i < cart.length; i++) {
        let subtotal = parseFloat(cart[i].price / 22600).toFixed(2);
        total += subtotal * cart[i].qty;
        items.push({
            "name": cart[i].name,
            "sku": cart[i].brief,
            "price": subtotal.toString(),
            "currency": "USD",
            "quantity": cart[i].qty
        })
    }
    let finalTotal = parseFloat(total).toFixed(2).toString();
    FINALTOTAL = finalTotal;
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:8080/pay/success",
            "cancel_url": "http://localhost:3000/pay/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": items
            },
            "amount": {
                "currency": "USD",
                "total": finalTotal
            },
            "description": "Hat for the best team ever"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
}


// View success page
exports.getSuccess = (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    let finalTotal = FINALTOTAL;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": finalTotal
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            // Insert start here
            let fullname = USER.lname + ' ' + USER.fname;
            let sqlPoint = '';
            if (USEPOINT == 'yes') {
                sqlPoint = ' UPDATE user SET point =' + POINT.toString() + ' WHERE id = ?;'
            } else {
                sqlPoint = ' UPDATE user SET point = point +' + POINT.toString() + ' WHERE id = ?;'
            }
            let insertOrder = 'INSERT INTO orders(fullname, phone, user_id, method, takeorhere, use_point, table_num, total_money) VALUES(?,?,?,?,?,?,?,?);' + sqlPoint;
            connection.query(insertOrder, [fullname, USER.phone, USER.id, 'Paypal', TAKEORHERE, USEPOINT, TABLENUM, TOTAL, USER.id], (err, results) => {
                if (err) throw err;
                let orderID = results[0].insertId;
                let cart = CART;
                let insertItem = 'INSERT INTO order_detail(order_id, food_name, price, qty, total_money) VALUES ?';
                let foodItems = [];
                for (let i = 0; i < cart.length; i++) {
                    foodItems.push([orderID, cart[i].name, cart[i].price, cart[i].qty, cart[i].price * cart[i].qty]);
                }
                connection.query(insertItem, [foodItems], (err, results) => {
                    if (err) throw err;
                    res.render('payment/success_cash', {
                        title: 'Thành công',
                        user: USER
                    })
                })
            })
            res.render('payment/success_cash', {
                title: 'Thành công',
                user: USER
            })
        }
    });


}

// View cancel page
exports.getCancel = (req, res) => {
    res.render('payment/cancel_cash', {
        title: 'Hủy bỏ',
        user: USER
    })
}