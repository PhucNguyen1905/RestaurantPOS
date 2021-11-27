const express = require("express");
const passport = require('passport');
const mysql = require("mysql");
const { request } = require("express");

//Connection pool
const connection = mysql.createPool({
    connectionLimit: 100,
    multipleStatements: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

function convertDate(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}
function convertTime(str) {
    var date = new Date(str)
    let hour = date.getHours();
    let minute = date.getMinutes();
    let sec = date.getSeconds();
    return hour.toString() + ':' + minute.toString() + ':' + sec.toString();
}

exports.viewNewOrder = (req, res) => {
    let sql = 'SELECT * FROM orders WHERE status = "wait"';
    connection.query(sql, (err, orders) => {
        if (err) throw err;
        res.render('cashier/new_order', {
            title: 'Đơn mới',
            hidden: 'hidden',
            messages: '',
            orders: orders,
            convertDate: convertDate,
            convertTime: convertTime
        })
    })
}
exports.viewOrderDetail = (req, res) => {
    let orderId = parseInt(req.params.id);
    let sql = 'SELECT * FROM orders WHERE id = ?; SELECT * FROM order_detail WHERE order_id =?';
    connection.query(sql, [orderId, orderId], (err, results) => {
        if (err) throw err;
        let order = results[0];
        let items = results[1];
        res.render('cashier/order_detail', {
            title: 'Chi tiết',
            hidden: 'hidden',
            messages: '',
            order: order[0],
            items: items,
            convertDate: convertDate,
            convertTime: convertTime
        })
    })
}
exports.completeOrder = (req, res) => {
    let orderId = parseInt(req.params.id);
    let sql = 'UPDATE orders SET status = "done" WHERE id = ?';
    connection.query(sql, [orderId], (err, results) => {
        if (err) throw err;
        let sql = 'SELECT * FROM orders WHERE status = "wait"';
        connection.query(sql, (err, orders) => {
            if (err) throw err;
            res.render('cashier/new_order', {
                title: 'Đơn mới',
                hidden: '',
                messages: 'Đã hoàn thành một đơn đặt hàng',
                orders: orders,
                convertDate: convertDate,
                convertTime: convertTime
            })
        })
    })
}
exports.deteteOrder = (req, res) => {
    let orderId = parseInt(req.params.id);
    let sql = 'DELETE FROM orders WHERE id = ?';
    connection.query(sql, [orderId], (err, results) => {
        if (err) throw err;
        let sql = 'SELECT * FROM orders WHERE status = "wait"';
        connection.query(sql, (err, orders) => {
            if (err) throw err;
            res.render('cashier/new_order', {
                title: 'Đơn mới',
                hidden: '',
                messages: 'Đã xóa một đơn đặt hàng',
                orders: orders,
                convertDate: convertDate,
                convertTime: convertTime
            })
        })
    })
}
exports.viewFinishOrder = (req, res) => {
    let sql = 'SELECT * FROM orders WHERE status = "done"';
    connection.query(sql, (err, orders) => {
        if (err) throw err;
        res.render('cashier/finish_order', {
            title: 'Đã hoàn thành',
            hidden: 'hidden',
            messages: '',
            orders: orders,
            convertDate: convertDate,
            convertTime: convertTime
        })
    })
}


// Login
exports.viewLogin = (req, res) => {
    if (res.locals.user) {
        res.redirect('/cashier');
    }
    res.render('cashier/login', {
        title: 'Log in'
    })
}

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/cashier',
        failureRedirect: '/cashier/login',
        failureFlash: false
    })(req, res, next);
}


// GET logout
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/cashier/login');
}


// [GET] /table
exports.manageTable = (req, res) => {
    connection.query('SELECT R.*, U.id as customerID, U.fname, U.lname, U.phone, U.email FROM Reserve as R, User as U WHERE U.id=R.CustomerID AND R.status="pending";', (err, tables) => {
        if (!err) {
            res.render('cashier/table-unresolved', {
                hidden: 'hidden',
                messages: '',
                title: 'Manage Tables',
                tables: tables
            })
        } else {
            console.log(err);
        }
    });
}

// [GET] /table-delete/:id
exports.deleteTable = (req, res) => {
    connection.query('DELETE FROM Reserve WHERE id=?',[req.params.id], (err) => {
        if (!err) {
            connection.query('SELECT R.*, U.id as customerID, U.fname, U.lname, U.phone, U.email FROM Reserve as R, User as U WHERE U.id=R.CustomerID AND R.status="pending";', (err, tables) => {
                if (!err) {
                    res.render('cashier/table-unresolved', {
                        hidden: 'hidden',
                        messages: '',
                        title: 'Manage Tables',
                        tables: tables
                    })
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
        }
    });
    
}


// [POST] /table-response/:id
exports.responseTable = (req, res) => {
    connection.query('UPDATE Reserve SET managerResponse=? , status=? WHERE id=?',[req.body.content, req.body.status, req.params.id], (err, tables) => {
        if (!err) {
            connection.query('SELECT R.*, U.id as customerID, U.fname, U.lname, U.phone, U.email FROM Reserve as R, User as U WHERE U.id=R.CustomerID AND R.status="pending";', (err, tables) => {
                if (!err) {
                    res.render('cashier/table-unresolved', {
                        hidden: 'hidden',
                        messages: '',
                        title: 'Manage Tables',
                        tables: tables
                    })
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
        }
    });
}

// [GET] /table-resolved
exports.viewTableResolved = (req, res) => {
    connection.query('SELECT R.*, U.id as customerID, U.fname, U.lname, U.phone, U.email FROM Reserve as R, User as U WHERE U.id=R.CustomerID AND NOT R.status="pending";', (err, tables) => {
        if (!err) {
            res.render('cashier/table-resolved', {
                hidden: 'hidden',
                messages: '',
                title: 'Manage Tables',
                tables: tables
            })
        } else {
            console.log(err);
        }
    });
}
    
