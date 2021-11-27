const express = require('express');
const mysql = require("mysql");

//Connection pool
const connection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
let USER;

exports.viewListAccount = (req, res) => {
    USER = res.locals.user;
    connection.query('SELECT * FROM user WHERE role_id BETWEEN 2 AND 4;', (err, staffs) => {
        if (err) throw err;
        res.render('admin/staff_list', {
            title: 'Nhân viên',
            hidden: 'hidden',
            messages: '',
            staffs: staffs,
            user: USER
        })
    })
}
exports.viewAddStaff = (req, res) => {
    res.render('admin/add_staff', {
        title: 'Tạo tài khoản',
        user: USER
    })
}
exports.addStaff = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let phone = req.body.phone;
    let address = req.body.address;
    let role = req.body.role;

    let sql = 'INSERT INTO user (fname, lname, email,password, phone,address, role_id) VALUES(?,?,?,?,?,?,?)'
    connection.query(sql, [fname, lname, username, password, phone, address, role], (err, rows) => {
        if (err) throw err;
        connection.query('SELECT * FROM user WHERE role_id BETWEEN 2 AND 4;', (err, staffs) => {
            if (err) throw err;
            res.render('admin/staff_list', {
                title: 'Nhân viên',
                hidden: '',
                messages: 'Đã tạo một tài khoản',
                staffs: staffs,
                user: USER
            })
        })
    })



}
exports.deleteStaff = (req, res) => {
    let id = req.params.id;
    connection.query('DELETE FROM user WHERE id = ?', [id], (error, result) => {
        // When done with the connection, release it
        if (!error) {
            connection.query('SELECT * FROM user WHERE role_id BETWEEN 2 AND 4;', (err, staffs) => {
                if (err) throw err;
                res.render('admin/staff_list', {
                    title: 'Nhân viên',
                    hidden: '',
                    messages: 'Đã xóa một tài khoản',
                    staffs: staffs,
                    user: USER
                })
            })
        } else {
            console.log(error);
        }
    });
}